import {
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
  Panel,
  ReactFlow,
} from "@xyflow/react";
import { MouseEvent, useCallback, useEffect, useMemo } from "react";

import { useGetDecisionTreeByIDQuery } from "@/api/decision-tree";
import ExportButton from "@/components/shared/export-button";
import ImportButton from "@/components/shared/import-button";
import SaveButton from "@/components/shared/save-button";
import { LoaderCircleIcon } from "lucide-react";
import { useParams } from "react-router";
import ContextMenu from "../components/shared/contextMenu";
import { customEdgeTypes } from "../constants/customEdgeTypes";
import { customNodeTypes } from "../constants/customNodeTypes";
import {
  hidePaneContextMenu,
  onConnect,
  onEdgesChange,
  onEdgesDelete,
  onNodesChange,
  onViewportChange,
  selectEdges,
  selectNodes,
  selectPaneContextVisible,
  selectViewport,
  setEdges,
  setNodes,
  setViewport,
  showPaneContextMenu,
} from "../state/editor/store";
import { useAppDispatch, useAppSelector } from "../state/hooks";

function Editor() {
  const { treeID } = useParams();
  const { data, isLoading, isError } = useGetDecisionTreeByIDQuery(
    treeID ?? ""
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (data) {
      dispatch(setNodes(data.tree.nodes));
      dispatch(setEdges(data.tree.edges));
      dispatch(setViewport(data.tree.viewport));
    }
  }, [data, dispatch]);

  const nodes = useAppSelector(selectNodes);
  const edges = useAppSelector(selectEdges);
  const viewport = useAppSelector(selectViewport);

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

  if (isError) return <div>Error Occurred</div>;
  if (isLoading) return <LoaderCircleIcon className="animate-spin" />;

  return (
    <ReactFlow
      viewport={viewport}
      nodeTypes={nodeTypes}
      edgeTypes={edgeTypes}
      nodes={nodes}
      edges={edges}
      onConnect={(conn) => dispatch(onConnect(conn))}
      onNodesChange={(ch) => dispatch(onNodesChange(ch))}
      onEdgesChange={(ch) => dispatch(onEdgesChange(ch))}
      onViewportChange={(v) => dispatch(onViewportChange(v))}
      onEdgesDelete={(edges) => dispatch(onEdgesDelete(edges))}
      onPaneContextMenu={handleOnContextMenu}
      onPaneClick={onPaneClick}
      proOptions={{ hideAttribution: true }}
    >
      {paneContextMenuVisible && <ContextMenu />}
      <Background
        variant={BackgroundVariant.Dots}
        color="rgba(10,10,10, 0.5)"
        gap={12}
        size={1}
      />
      <MiniMap />
      <Panel className="absolute !top-20 flex items-center justify-center gap-2">
        <SaveButton />
        <ExportButton />
        <ImportButton />
      </Panel>
      <Controls />
    </ReactFlow>
  );
}

export default Editor;
