import {
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
  ReactFlow,
} from "@xyflow/react";
import { MouseEvent, useCallback, useMemo, useRef } from "react";

import ContextMenu from "../components/shared/contextMenu";
import Navbar from "../components/shared/navbar";
import { customEdgeTypes } from "../constants/customEdgeTypes";
import { customNodeTypes } from "../constants/customNodeTypes";
import {
  hidePaneContextMenu,
  onConnect,
  onEdgesChange,
  onEdgesDelete,
  onNodesChange,
  selectEdges,
  selectNodes,
  selectPaneContextVisible,
  showPaneContextMenu,
} from "../state/editor/store";
import { useAppDispatch, useAppSelector } from "../state/hooks";

function Editor() {
  const rfRef = useRef<HTMLDivElement | null>(null);
  // const instance = useReactFlow();
  const nodes = useAppSelector(selectNodes);
  const edges = useAppSelector(selectEdges);
  const dispatch = useAppDispatch();
  const paneContextMenuVisible = useAppSelector(selectPaneContextVisible);

  const nodeTypes = useMemo(() => customNodeTypes, []);
  const edgeTypes = useMemo(() => customEdgeTypes, []);

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
      <Navbar />
      <ReactFlow
        ref={rfRef}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        nodes={nodes}
        edges={edges}
        onConnect={(conn) => dispatch(onConnect(conn))}
        onNodesChange={(ch) => dispatch(onNodesChange(ch))}
        onEdgesChange={(ch) => dispatch(onEdgesChange(ch))}
        onEdgesDelete={(edges) => dispatch(onEdgesDelete(edges))}
        onPaneContextMenu={handleOnContextMenu}
        onPaneClick={onPaneClick}
        proOptions={{ hideAttribution: true }}
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
      </ReactFlow>
    </div>
  );
}

export default Editor;
