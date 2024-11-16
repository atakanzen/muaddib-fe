import {
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
  Panel,
  ReactFlow,
  useReactFlow,
} from "@xyflow/react";
import {
  MouseEvent,
  MouseEventHandler,
  useCallback,
  useMemo,
  useRef,
} from "react";

import ContextMenu from "./components/contextMenu";
import { customEdgeTypes } from "./constants/customEdgeTypes";
import { customNodeTypes } from "./constants/customNodeTypes";
import {
  hidePaneContextMenu,
  onConnect,
  onEdgesChange,
  onNodesChange,
  selectEdges,
  selectNodes,
  selectPaneContextVisible,
  showPaneContextMenu,
} from "./state/editor/store";
import { useAppDispatch, useAppSelector } from "./state/hooks";

function App() {
  const rfRef = useRef<HTMLDivElement | null>(null);
  const instance = useReactFlow();
  const nodes = useAppSelector(selectNodes);
  const edges = useAppSelector(selectEdges);
  const dispatch = useAppDispatch();
  const paneContextMenuVisible = useAppSelector(selectPaneContextVisible);

  const nodeTypes = useMemo(() => customNodeTypes, []);
  const edgeTypes = useMemo(() => customEdgeTypes, []);

  const handleLogCurrentState: MouseEventHandler<HTMLElement> = (e) => {
    e.preventDefault();
    console.log(instance.toObject());
  };

  const handleOnContextMenu = (e: MouseEvent | globalThis.MouseEvent) => {
    e.preventDefault();
    const canvas = document.querySelector(".react-flow__renderer");
    if (canvas) {
      const canvasRect = canvas.getBoundingClientRect();
      const adjustedPosition = {
        x: e.clientX - canvasRect.left,
        y: e.clientY - canvasRect.top,
      };
      dispatch(
        showPaneContextMenu({ x: adjustedPosition.x, y: adjustedPosition.y })
      );
    }
  };

  const onPaneClick = useCallback(
    () => dispatch(hidePaneContextMenu()),
    [dispatch]
  );

  return (
    <div className="w-screen h-screen">
      <ReactFlow
        ref={rfRef}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        nodes={nodes}
        edges={edges}
        onConnect={(conn) => dispatch(onConnect(conn))}
        onNodesChange={(ch) => dispatch(onNodesChange(ch))}
        onEdgesChange={(ch) => dispatch(onEdgesChange(ch))}
        onPaneContextMenu={handleOnContextMenu}
        onPaneClick={onPaneClick}
        fitView
      >
        {paneContextMenuVisible && <ContextMenu />}
        <Background
          variant={BackgroundVariant.Dots}
          color="rgba(10,10,10, 0.5)"
          gap={12}
          size={1}
        />
        <MiniMap />
        <Controls />
        <Panel
          position="top-right"
          className="flex gap-2 items-center justify-between"
        >
          <button
            className="bg-orange-500 py-1 px-2 rounded-md text-white font-semibold"
            onClick={handleLogCurrentState}
          >
            Log current state
          </button>
          <button
            className="bg-orange-500 py-1 px-2 rounded-md text-white font-semibold"
            onClick={() => alert("in development")}
          >
            Save
          </button>
        </Panel>
      </ReactFlow>
    </div>
  );
}

export default App;
