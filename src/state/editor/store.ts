import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Connection,
  Edge,
  EdgeChange,
  Node,
  NodeChange,
} from "@xyflow/react";
import { TChanceEdge } from "../../edges/chance-edge";
import { toFixedFloat } from "../../utils/toFixedFloat";
import { isChanceEdge, isTextNode, isValueEdge } from "../../utils/type-guards";
import { sensorDemo } from "../demos";
import { RootState } from "../store";

export interface EditorState {
  nodes: Node[];
  edges: Edge[];
  paneContextMenu: {
    visible: boolean;
    position: { x: number; y: number };
  };
}

const initialState: EditorState = sensorDemo;

export const editorSlice = createSlice({
  name: "editor",
  initialState,
  reducers: {
    onNodesChange: (state, action: PayloadAction<NodeChange[]>) => {
      state.nodes = applyNodeChanges(action.payload, state.nodes);
    },
    onEdgesChange: (state, action: PayloadAction<EdgeChange[]>) => {
      state.edges = applyEdgeChanges(action.payload, state.edges);
    },
    onEdgesDelete: (state, action: PayloadAction<Edge[]>) => {
      const edgesDeleted = action.payload;

      edgesDeleted.forEach((e) => {
        if (isChanceEdge(e)) {
          const siblingChanceEdges = state.edges.filter(
            (oe) => isChanceEdge(oe) && oe.id !== e.id && oe.source === e.source
          ) as TChanceEdge[];

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
      const { source } = action.payload;
      const sourceNode = state.nodes.find((n) => n.id === source);

      if (!sourceNode) {
        console.error("no source node find");
        return;
      }

      if (sourceNode.type === "decisionNode") {
        state.edges = addEdge(
          {
            type: "decisionEdge",
            animated: true,
            data: { payoff: 0 },
            ...action.payload,
          },
          state.edges
        );
      } else if (sourceNode.type === "chanceNode") {
        const siblingChanceEdges = state.edges
          .filter(isChanceEdge)
          .filter((e) => e.source === source);

        const totalSiblingProbability = siblingChanceEdges.reduce(
          (sum, edge) => sum + edge.data.probability,
          0
        );

        const remainingProbability = 100 - totalSiblingProbability;

        const newProbability =
          remainingProbability > 0 ? remainingProbability : 0;

        state.edges = addEdge(
          {
            type: "chanceEdge",
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

      const chanceEdge = state.edges
        .filter(isChanceEdge)
        .find((cn) => cn.id === edgeID);

      if (!chanceEdge) {
        console.error("no chance edge found");
        return;
      }

      chanceEdge.data.probability = Math.min(probability, 100);
      chanceEdge.data.isSetByUser = true;

      const remainingProbability = 100 - chanceEdge.data.probability;

      const otherChanceEdges = state.edges.filter((e) => {
        if (!isChanceEdge(e) || e.source !== sourceNodeID || e.id === edgeID) {
          return false;
        }

        return true;
      }) as TChanceEdge[];

      if (remainingProbability < 0) {
        console.log("Probabilities do not sum up to 100%"); // TODO: Handle this
      }

      const dividedProbability =
        otherChanceEdges.length > 0
          ? toFixedFloat(
              Math.max(remainingProbability / otherChanceEdges.length, 0),
              2
            )
          : 0;

      otherChanceEdges.forEach((otherNode) => {
        otherNode.data.probability = dividedProbability;
      });
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

      const decisionEdge = state.edges
        .filter(isValueEdge)
        .find((e) => e.id === id);
      if (!decisionEdge) {
        console.error("value edge not found");
        return;
      }

      decisionEdge.data.payoff = value;
      decisionEdge.data.payoffType =
        value > 0 ? "profit" : value < 0 ? "cost" : undefined;
    },
    changePayoffInputForChanceEdge: (
      state,
      action: PayloadAction<{ id: string; value: number }>
    ) => {
      const { id, value } = action.payload;

      const chanceEdge = state.edges
        .filter(isChanceEdge)
        .find((e) => e.id === id);

      if (!chanceEdge) {
        console.error("chance edge not found");
        return;
      }
      chanceEdge.data.payoff = value;
      chanceEdge.data.payoffType =
        value > 0 ? "profit" : value < 0 ? "cost" : undefined;
    },
  },
});

export const {
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
} = editorSlice.actions;

export const selectNodes = (state: RootState) => state.editor.nodes;
export const selectEdges = (state: RootState) => state.editor.edges;
export const selectEdgeByID = createSelector(
  [
    (state: RootState) => state.editor.edges,
    (_state: RootState, edgeID: string) => edgeID,
  ],
  (edges, edgeID) => edges.find((e) => e.id === edgeID) as TChanceEdge
);
export const selectPaneContextVisible = (state: RootState) =>
  state.editor.paneContextMenu.visible;
export const selectPaneContextPosition = (state: RootState) =>
  state.editor.paneContextMenu.position;

export default editorSlice.reducer;
