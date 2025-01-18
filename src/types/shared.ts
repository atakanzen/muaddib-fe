import { ReactFlowJsonObject } from "@xyflow/react";

type ErrorResponse = {
  message: string[] | string;
  error: string;
  statusCode: number;
};

type EditorLocalState = ReactFlowJsonObject & {
  paneContextMenu: {
    visible: boolean;
    position: { x: number; y: number };
  };
};

export type { EditorLocalState, ErrorResponse };
