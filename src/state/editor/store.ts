import { EditorLocalState } from "@/types/shared";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Connection,
  Edge,
  EdgeChange,
  Node,
  NodeChange,
  Viewport,
} from "@xyflow/react";
import { TChanceToChanceEdge } from "../../edges/chance-to-chance-edge";
import { TChanceToEndpointEdge } from "../../edges/chance-to-endpoint-edge";
import { TDecisionEdge } from "../../edges/decision-edge";
import { TEndpointNode } from "../../nodes/endpoint-node";
import {
  calculateTotalPayoff,
  findConnectedEndpoints,
  handleEdgeChange,
} from "../../utils/ev-calculations";
import { toFixedFloat } from "../../utils/toFixedFloat";
import {
  isChanceNode,
  isChanceToChanceEdge,
  isChanceToEndpointEdge,
  isDecisionEdge,
  isDecisionNode,
  isEndpointNode,
  isTextNode,
} from "../../utils/type-guards";
import { sensorDemo } from "../demos";
import { RootState } from "../store";

const initialState: EditorLocalState = sensorDemo;

export const editorSlice = createSlice({
  name: "editor",
  initialState,
  reducers: {
    setNodes: (state, action: PayloadAction<Node[]>) => {
      state.nodes = action.payload;
    },
    setEdges: (state, action: PayloadAction<Edge[]>) => {
      state.edges = action.payload;
    },
    setViewport: (state, action: PayloadAction<Viewport>) => {
      state.viewport = action.payload;
    },
    onViewportChange: (state, action: PayloadAction<Viewport>) => {
      state.viewport = action.payload;
    },
    onNodesChange: (state, action: PayloadAction<NodeChange[]>) => {
      state.nodes = applyNodeChanges(action.payload, state.nodes);
    },
    onEdgesChange: (state, action: PayloadAction<EdgeChange[]>) => {
      state.edges = applyEdgeChanges(action.payload, state.edges);
    },
    onEdgesDelete: (state, action: PayloadAction<Edge[]>) => {
      const edgesDeleted = action.payload;

      edgesDeleted.forEach((e) => {
        if (isChanceToEndpointEdge(e)) {
          const siblingChanceEdges = state.edges.filter(
            (oe) =>
              isChanceToEndpointEdge(oe) &&
              oe.id !== e.id &&
              oe.source === e.source
          ) as TChanceToEndpointEdge[];

          // Divide equally leftover sibling chance edges probability
          if (siblingChanceEdges.length > 0) {
            const dividedProbability = toFixedFloat(
              Math.max(100 / siblingChanceEdges.length, 0),
              2
            );

            siblingChanceEdges.forEach((se) => {
              se.data.probability = dividedProbability;
            });
          }

          const targetNode = state.nodes.find((n) => n.id === e.target);
          if (!targetNode) {
            console.error("no target node found for deleted chance edge");
            return;
          }

          state.nodes = state.nodes.filter((n) => n.id !== targetNode.id);
        }
      });
    },
    onConnect: (state, action: PayloadAction<Connection>) => {
      const { source, target } = action.payload;
      const sourceNode = state.nodes.find((n) => n.id === source);
      const targetNode = state.nodes.find((n) => n.id === target);

      if (!sourceNode) {
        console.error("no source node find");
        return;
      }

      if (!targetNode) {
        console.error("no target node find");
        return;
      }

      if (isDecisionNode(sourceNode)) {
        state.edges = addEdge(
          {
            type: "decisionEdge",
            animated: true,
            data: { payoff: 0 },
            ...action.payload,
          },
          state.edges
        );
      } else if (isChanceNode(sourceNode) && isEndpointNode(targetNode)) {
        const siblingChanceEdges = state.edges.filter(
          (e) =>
            e.source === source &&
            (isChanceToEndpointEdge(e) || isChanceToChanceEdge(e))
        ) as (TChanceToChanceEdge | TChanceToEndpointEdge)[];

        const totalSiblingProbability = siblingChanceEdges.reduce(
          (sum, edge) => sum + edge.data.probability,
          0
        );

        const remainingProbability = 100 - totalSiblingProbability;

        const newProbability =
          remainingProbability > 0 ? remainingProbability : 0;

        state.edges = addEdge(
          {
            type: "chanceToEndpointEdge",
            animated: true,
            data: {
              probability: newProbability,
              isSetByUser: false,
              payoff: 0,
            },
            ...action.payload,
          },
          state.edges
        );
      } else if (
        isChanceNode(sourceNode) &&
        (isChanceNode(targetNode) || isDecisionNode(targetNode))
      ) {
        const siblingChanceEdges = state.edges.filter(
          (e) =>
            e.source === source &&
            (isChanceToEndpointEdge(e) || isChanceToChanceEdge(e))
        ) as (TChanceToChanceEdge | TChanceToEndpointEdge)[];

        const totalSiblingProbability = siblingChanceEdges.reduce(
          (sum, edge) => sum + edge.data.probability,
          0
        );

        const remainingProbability = 100 - totalSiblingProbability;

        const newProbability =
          remainingProbability > 0 ? remainingProbability : 0;

        state.edges = addEdge(
          {
            type: "chanceToChanceEdge",
            animated: true,
            data: {
              probability: newProbability,
              isSetByUser: false,
            },
            ...action.payload,
          },
          state.edges
        );
      }
    },
    addNode: (state, action: PayloadAction<Node>) => {
      state.nodes.push(action.payload);
    },
    showPaneContextMenu: (
      state,
      action: PayloadAction<{ x: number; y: number }>
    ) => {
      const { x, y } = action.payload;
      state.paneContextMenu.position.x = x;
      state.paneContextMenu.position.y = y;
      state.paneContextMenu.visible = true;
    },
    hidePaneContextMenu: (state) => {
      state.paneContextMenu.visible = false;
    },
    changeProbabilityForChanceEdge: (
      state,
      action: PayloadAction<{
        edgeID: string;
        probability: number;
        sourceNodeID: string;
      }>
    ) => {
      const { edgeID, probability, sourceNodeID } = action.payload;

      const chanceEdge = state.edges.find(
        (e) =>
          e.id === edgeID &&
          (isChanceToEndpointEdge(e) || isChanceToChanceEdge(e))
      ) as TChanceToEndpointEdge | TChanceToChanceEdge | undefined;

      if (!chanceEdge) {
        console.error("no chance edge found");
        return;
      }

      chanceEdge.data.probability = probability;
      chanceEdge.data.isSetByUser = true;

      const siblingChanceEdges = state.edges.filter((e) => {
        if (
          (!isChanceToEndpointEdge(e) && !isChanceToChanceEdge(e)) ||
          e.source !== sourceNodeID ||
          e.id === edgeID
        ) {
          return false;
        }

        return true;
      }) as (TChanceToEndpointEdge | TChanceToChanceEdge)[];

      // If in total 2 edges, automatically set the other one to leftover
      if (siblingChanceEdges.length === 1) {
        const remainingProbability = 100 - chanceEdge.data.probability;
        const dividedProbability =
          siblingChanceEdges.length > 0
            ? toFixedFloat(
                Math.max(remainingProbability / siblingChanceEdges.length, 0),
                2
              )
            : 0;

        siblingChanceEdges.forEach((sibling) => {
          sibling.data.probability = dividedProbability;
        });
      }

      const totalSiblingProbability = siblingChanceEdges.reduce(
        (acc, curr) => acc + curr.data.probability,
        probability
      );

      if (totalSiblingProbability !== 100) {
        siblingChanceEdges.forEach((sibling) => (sibling.data.isFaulty = true));
        chanceEdge.data.isFaulty = true;
        handleEdgeChange(edgeID, state, true);
        return;
      } else if (totalSiblingProbability === 100) {
        siblingChanceEdges.forEach(
          (sibling) => (sibling.data.isFaulty = false)
        );
        chanceEdge.data.isFaulty = false;
      }

      handleEdgeChange(edgeID, state);
    },
    changeInputForTextNode: (
      state,
      action: PayloadAction<{ id: string; input: string }>
    ) => {
      const { id, input } = action.payload;
      const textNode = state.nodes.filter(isTextNode).find((n) => n.id === id);
      if (!textNode) {
        console.error("text node not found in store");
        return;
      }
      textNode.data.text = input;
    },
    changePayoffInputForDecisionEdge: (
      state,
      action: PayloadAction<{ id: string; value: number }>
    ) => {
      const { id, value } = action.payload;

      const decisionEdge = state.edges.find(
        (e) => e.id === id && isDecisionEdge(e)
      ) as TDecisionEdge | undefined;

      if (!decisionEdge) {
        console.error("decision edge not found");
        return;
      }

      decisionEdge.data.payoff = value;
      decisionEdge.data.payoffType =
        value > 0 ? "profit" : value < 0 ? "cost" : undefined;

      const connectedEndpoints = findConnectedEndpoints(
        decisionEdge.target,
        state.edges,
        state.nodes
      );

      connectedEndpoints.forEach((endpointNode) => {
        endpointNode.data.calculatedPayoff = calculateTotalPayoff(
          endpointNode.id,
          state.edges
        );
      });

      handleEdgeChange(id, state);
    },
    changePayoffInputForChanceEdge: (
      state,
      action: PayloadAction<{ id: string; value: number }>
    ) => {
      const { id, value } = action.payload;

      const chanceToEndpointEdge = state.edges.find(
        (e) => e.id === id && isChanceToEndpointEdge(e)
      ) as TChanceToEndpointEdge | undefined;

      if (!chanceToEndpointEdge) {
        console.error("chance to endpoint edge not found");
        return;
      }

      chanceToEndpointEdge.data.payoff = value;
      chanceToEndpointEdge.data.payoffType =
        value > 0 ? "profit" : value < 0 ? "cost" : undefined;

      const targetNode = state.nodes.find(
        (n) => n.id === chanceToEndpointEdge.target && isEndpointNode(n)
      ) as TEndpointNode | undefined;
      if (targetNode) {
        targetNode.data.calculatedPayoff = calculateTotalPayoff(
          targetNode.id,
          state.edges
        );
      }

      handleEdgeChange(id, state);
    },
  },
});

export const {
  onViewportChange,
  onConnect,
  onEdgesChange,
  onNodesChange,
  onEdgesDelete,
  addNode,
  showPaneContextMenu,
  hidePaneContextMenu,
  changeProbabilityForChanceEdge,
  changePayoffInputForDecisionEdge,
  changePayoffInputForChanceEdge,
  changeInputForTextNode,
  setViewport,
  setNodes,
  setEdges,
} = editorSlice.actions;

export const selectEditorState = (state: RootState) => state.editor;
export const selectViewport = (state: RootState) => state.editor.viewport;
export const selectNodes = (state: RootState) => state.editor.nodes;
export const selectEdges = (state: RootState) => state.editor.edges;
export const selectEdgeByID = <T = Edge>(state: RootState, edgeID: string) =>
  state.editor.edges.find((e) => e.id === edgeID) as T | undefined;
export const selectNodeByID = <T = Node>(state: RootState, nodeID: string) =>
  state.editor.nodes.find((n) => n.id === nodeID) as T | undefined;
export const selectPaneContextVisible = (state: RootState) =>
  state.editor.paneContextMenu.visible;
export const selectPaneContextPosition = (state: RootState) =>
  state.editor.paneContextMenu.position;

export default editorSlice.reducer;
