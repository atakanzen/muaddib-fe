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
import useContextMenu from "./hooks/useContextMenu";
import {
  onConnect,
  onEdgesChange,
  onNodesChange,
  selectEdges,
  selectNodes,
} from "./state/editor/store";
import { useAppDispatch, useAppSelector } from "./state/hooks";

function App() {
  const rfRef = useRef<HTMLDivElement | null>(null);
  const instance = useReactFlow();
  const nodes = useAppSelector(selectNodes);
  const edges = useAppSelector(selectEdges);
  const dispatch = useAppDispatch();
  const { menuVisible, showMenu, hideMenu, menuPosition } = useContextMenu();

  const nodeTypes = useMemo(() => customNodeTypes, []);
  const edgeTypes = useMemo(() => customEdgeTypes, []);

  const handleLogCurrentState: MouseEventHandler<HTMLElement> = (e) => {
    e.preventDefault();
    console.log(instance.toObject());
  };

  const handleOnContextMenu = (e: MouseEvent | globalThis.MouseEvent) => {
    e.preventDefault();
    showMenu(e.clientX, e.clientY);
  };

  const onPaneClick = useCallback(() => hideMenu(), [hideMenu]);

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
        {menuVisible && <ContextMenu menuPosition={menuPosition} />}
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
