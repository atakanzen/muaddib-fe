import { useReactFlow } from "@xyflow/react";
import { useCallback } from "react";
import {
  CHANCE_NODE_TYPE,
  DECISION_NODE_TYPE,
  ENDPOINT_NODE_TYPE,
  TEXT_NODE_TYPE,
} from "../../constants/customNodeTypes";
import {
  addNode,
  hidePaneContextMenu,
  selectPaneContextPosition,
} from "../../state/editor/store";
import { useAppDispatch, useAppSelector } from "../../state/hooks";

const ContextMenu = () => {
  const contextMenuPosition = useAppSelector(selectPaneContextPosition);
  const { screenToFlowPosition } = useReactFlow();
  const dispatch = useAppDispatch();

  const handleAddNode = useCallback(
    (
      e: React.MouseEvent<HTMLLIElement | null>,
      nodeType: string,
      nodeData?: Record<string, unknown>
    ) => {
      e.preventDefault();
      dispatch(hidePaneContextMenu());

      const canvas = document.querySelector(".react-flow__renderer");
      if (canvas) {
        const canvasRect = canvas.getBoundingClientRect();
        const adjustedPosition = {
          x: contextMenuPosition.x - canvasRect.left,
          y: contextMenuPosition.y - canvasRect.top,
        };
        const { x, y } = screenToFlowPosition(adjustedPosition);
        dispatch(
          addNode({
            id: crypto.randomUUID(),
            data: nodeData ?? {},
            type: nodeType,
            position: { x, y },
          })
        );
      }
    },
    [
      dispatch,
      contextMenuPosition.x,
      contextMenuPosition.y,
      screenToFlowPosition,
    ]
  );

  return (
    <div
      className="absolute h-64 w-72 bg-white border rounded z-50 p-2 shadow-funky"
      style={{
        top: `${contextMenuPosition.y}px`,
        left: `${contextMenuPosition.x}px`,
      }}
    >
      <span className="font-bold">Context Menu</span>
      <ul className="flex flex-col gap-2 mt-4 items-start justify-center">
        <li
          onClick={(e) =>
            handleAddNode(e, DECISION_NODE_TYPE, { isRoot: true })
          }
          className="border-b cursor-pointer hover:bg-gray-200 w-full"
        >
          Root Decision Node
        </li>
        <li
          onClick={(e) =>
            handleAddNode(e, DECISION_NODE_TYPE, { isRoot: false })
          }
          className="border-b cursor-pointer hover:bg-gray-200 w-full"
        >
          Intermediary Decision Node
        </li>
        <li
          onClick={(e) => handleAddNode(e, CHANCE_NODE_TYPE)}
          className="border-b cursor-pointer hover:bg-gray-200 w-full"
        >
          Chance Node
        </li>
        <li
          onClick={(e) => handleAddNode(e, ENDPOINT_NODE_TYPE)}
          className="border-b cursor-pointer hover:bg-gray-200 w-full"
        >
          Endpoint Node
        </li>
        <li
          onClick={(e) => handleAddNode(e, TEXT_NODE_TYPE, { text: "" })}
          className="border-b cursor-pointer hover:bg-gray-200 w-full"
        >
          Text Node
        </li>
      </ul>
    </div>
  );
};

export default ContextMenu;
