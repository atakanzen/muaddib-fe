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
import { RootState } from "../store";

interface EditorState {
  nodes: Node[];
  edges: Edge[];
}

const initialState: EditorState = {
  nodes: [
    { id: "1", position: { x: 0, y: 0 }, type: "decisionNode", data: {} },
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
    { id: "5", position: { x: 300, y: 85 }, type: "endpointNode", data: {} },
    { id: "6", position: { x: 300, y: 15 }, type: "endpointNode", data: {} },
    { id: "7", position: { x: 300, y: -65 }, type: "endpointNode", data: {} },
  ],
  edges: [
    { id: "1-2", source: "1", target: "2", sourceHandle: "1", animated: true },
    { id: "1-3", source: "1", target: "3", sourceHandle: "1", animated: true },
    { id: "1-4", source: "1", target: "4", sourceHandle: "1", animated: true },
    { id: "4-7", source: "4", target: "7", animated: true },
    { id: "3-6", source: "3", target: "6", animated: true },
    { id: "2-5", source: "2", target: "5", animated: true },
  ],
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
      state.edges = addEdge(action.payload, state.edges);
    },
  },
});

export const { onConnect, onEdgesChange, onNodesChange } = editorSlice.actions;

export const selectNodes = (state: RootState) => state.editor.nodes;
export const selectEdges = (state: RootState) => state.editor.edges;

export default editorSlice.reducer;
