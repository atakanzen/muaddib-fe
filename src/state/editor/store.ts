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
} from "@xyflow/react";
import { isTextNode, isValueEdge } from "../../utils/type-guards";
import { RootState } from "../store";

interface EditorState {
  nodes: Node[];
  edges: Edge[];
  paneContextMenu: {
    visible: boolean;
    position: { x: number; y: number };
  };
}

const initialState: EditorState = {
  nodes: [
    { id: "1", position: { x: -300, y: 0 }, type: "decisionNode", data: {} },
    {
      id: "2",
      position: { x: 100, y: 75 },
      type: "chanceNode",
      data: { probability: 33.33 },
    },
    {
      id: "3",
      position: { x: 100, y: 0 },
      type: "chanceNode",
      data: { probability: 33.33 },
    },
    {
      id: "4",
      position: { x: 100, y: -75 },
      type: "chanceNode",
      data: { probability: 33.33 },
    },
    { id: "5", position: { x: 500, y: 85 }, type: "endpointNode", data: {} },
    { id: "6", position: { x: 500, y: 15 }, type: "endpointNode", data: {} },
    { id: "7", position: { x: 500, y: -65 }, type: "endpointNode", data: {} },
  ],
  edges: [
    {
      id: "1-2",
      source: "1",
      target: "2",
      sourceHandle: "1",
      animated: true,
      type: "valueEdge",
      data: { value: 0 },
    },
    {
      id: "1-3",
      source: "1",
      target: "3",
      sourceHandle: "1",
      animated: true,
      type: "valueEdge",
      data: { value: -10_000, valueType: "cost" },
    },
    {
      id: "1-4",
      source: "1",
      target: "4",
      sourceHandle: "1",
      animated: true,
      type: "valueEdge",
      data: { value: -100_000, valueType: "cost" },
    },
    {
      id: "4-7",
      source: "4",
      target: "7",
      animated: true,
      type: "valueEdge",
      data: { value: 100000 },
    },
    {
      id: "3-6",
      source: "3",
      target: "6",
      animated: true,
      type: "valueEdge",
      data: { value: 100000, type: "cost" },
    },
    {
      id: "2-5",
      source: "2",
      target: "5",
      animated: true,
      type: "valueEdge",
      data: { value: 100000, type: "profit" },
    },
  ],
  paneContextMenu: {
    visible: false,
    position: { x: 0, y: 0 },
  },
};

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
    onConnect: (state, action: PayloadAction<Connection>) => {
      const { source } = action.payload;
      const sourceNode = state.nodes.find((n) => n.id === source);

      if (!sourceNode) {
        return;
      }

      if (sourceNode.type === "decisionNode") {
        state.edges = addEdge(
          {
            type: "valueEdge",
            animated: true,
            data: { value: 0, type: "profit" },
            ...action.payload,
          },
          state.edges
        );
      } else {
        state.edges = addEdge(action.payload, state.edges);
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
    // changeProbabilityForChanceNode: (
    //   state,
    //   action: PayloadAction<{
    //     nodeID: string;
    //     probability: number;
    //     parentNodeID: string;
    //   }>
    // ) => {
    //   const { nodeID, probability, parentNodeID } = action.payload;
    //   const chanceNode = state.nodes
    //     .filter(isChanceNode)
    //     .find((cn) => cn.id === nodeID);

    //   if (!chanceNode) {
    //     return;
    //   }

    //   chanceNode.data.probability = probability;
    //   chanceNode.data.isSetByUser = true;

    //   const otherChanceNodeIDs = state.edges
    //     .filter((e) => e.source === parentNodeID && e.target !== nodeID)
    //     .map((cn) => cn.target);

    //   let remainingProbability = 100 - probability;
    //   const otherNodes: TChanceNode[] = [];

    //   // Build array of nodes NOT set by user and calculate remaining possibility
    //   otherChanceNodeIDs.forEach((otherNodeID) => {
    //     const otherNode = state.nodes.find((n) => n.id === otherNodeID);

    //     if (!otherNode || !isChanceNode(otherNode)) {
    //       return;
    //     }

    //     if (otherNode.data.isSetByUser) {
    //       remainingProbability -= otherNode.data.probability;
    //     } else {
    //       otherNodes.push(otherNode);
    //     }
    //   });

    //   if (remainingProbability < 0) {
    //     console.log("Probabilities do not sum up to 100%"); // TODO: Handle this
    //   }

    //   const dividedProbability =
    //     otherNodes.length > 0
    //       ? Math.max(remainingProbability / otherNodes.length, 0)
    //       : 0;

    //   otherNodes.forEach((otherNode) => {
    //     otherNode.data.probability = dividedProbability;
    //   });
    // },
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
    changeInputForValueEdge: (
      state,
      action: PayloadAction<{ id: string; value: number }>
    ) => {
      const { id, value } = action.payload;

      const valueEdge = state.edges
        .filter(isValueEdge)
        .find((e) => e.id === id);
      if (!valueEdge) {
        console.error("value edge not found");
        return;
      }

      valueEdge.data.value = value;
      valueEdge.data.valueType =
        value > 0 ? "profit" : value < 0 ? "cost" : undefined;
    },
  },
});

export const {
  onConnect,
  onEdgesChange,
  onNodesChange,
  addNode,
  showPaneContextMenu,
  hidePaneContextMenu,
  // changeProbabilityForChanceNode,
  changeInputForValueEdge,
  changeInputForTextNode,
} = editorSlice.actions;

export const selectNodes = (state: RootState) => state.editor.nodes;
export const selectEdges = (state: RootState) => state.editor.edges;
export const selectPaneContextVisible = (state: RootState) =>
  state.editor.paneContextMenu.visible;
export const selectPaneContextPosition = (state: RootState) =>
  state.editor.paneContextMenu.position;

export default editorSlice.reducer;
