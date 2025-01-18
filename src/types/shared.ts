import { Edge, Node, Viewport } from "@xyflow/react";

type ErrorResponse = {
  message: string[] | string;
  error: string;
  statusCode: number;
};

type EditorLocalState = {
  nodes: Node[];
  edges: Edge[];
  viewport: Viewport;
  paneContextMenu: {
    visible: boolean;
    position: { x: number; y: number };
  };
};

export type { EditorLocalState, ErrorResponse };
