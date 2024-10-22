import { Handle, NodeProps, NodeToolbar, Position } from "@xyflow/react";

export const DecisionNode = (_props: NodeProps) => {
  return (
    <>
      <div className="p-4 bg-white text-black border border-black shadow-funky">
        <Handle type="source" position={Position.Right} />
      </div>
      <NodeToolbar
        className="p-1 rounded backdrop-blur-md"
        isVisible
        position={Position.Bottom}
      >
        <label className="font-bold">Decision Node</label>
      </NodeToolbar>
    </>
  );
};
