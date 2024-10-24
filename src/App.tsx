import { MouseEventHandler, useCallback, useMemo, useState } from "react";
import {
  ReactFlow,
  Background,
  BackgroundVariant,
  Controls,
  Edge,
  MiniMap,
  Node,
  OnConnect,
  Panel,
  addEdge,
  useEdgesState,
  useNodesState,
  ReactFlowJsonObject,
  useReactFlow,
  ReactFlowInstance,
} from "@xyflow/react";

import { customNodeTypes } from "./constants/customNodeTypes";
import { customEdgeTypes } from "./constants/customEdgeTypes";

const initialNodes: Node[] = [
  { id: "1", position: { x: 0, y: 0 }, type: "decisionNode", data: {} },
  { id: "2", position: { x: 100, y: 75 }, type: "chanceNode", data: {} },
  { id: "3", position: { x: 100, y: 0 }, type: "chanceNode", data: {} },
  { id: "4", position: { x: 100, y: -75 }, type: "chanceNode", data: {} },
  { id: "5", position: { x: 300, y: 85 }, type: "endpointNode", data: {} },
  { id: "6", position: { x: 300, y: 15 }, type: "endpointNode", data: {} },
  { id: "7", position: { x: 300, y: -65 }, type: "endpointNode", data: {} },
];

const initalEdges: Edge[] = [
  { id: "1-2", source: "1", target: "2", animated: true },
  { id: "1-3", source: "1", target: "3", animated: true },
  { id: "1-4", source: "1", target: "4", animated: true },
  { id: "4-7", source: "4", target: "7", animated: true },
  { id: "3-6", source: "3", target: "6", animated: true },
  { id: "2-5", source: "2", target: "5", animated: true },
];

function App() {
  const [nodes, _setNodes, onNodesChange] = useNodesState<Node>(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>(initalEdges);
  const [rfInstance, setRfInstance] = useState<ReactFlowInstance>();

  const onConnect: OnConnect = useCallback(
    (connection) =>
      setEdges((eds) => addEdge({ ...connection, type: "bezierEdge" }, eds)),
    [setEdges]
  );

  const nodeTypes = useMemo(() => customNodeTypes, []);
  const edgeTypes = useMemo(() => customEdgeTypes, []);

  const handleLogCurrentState: MouseEventHandler<HTMLElement> = (e) => {
    e.preventDefault();
    console.log(rfInstance?.toObject());
  };

  return (
    <div className="w-screen h-screen">
      <ReactFlow
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        nodes={nodes}
        edges={edges}
        onConnect={onConnect}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onInit={(inst) => setRfInstance(inst)}
        fitView
      >
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
