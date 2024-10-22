import { Handle, NodeProps, NodeToolbar, Position } from "@xyflow/react";
import { ConnectionLimitHandle } from "../handles/connection-limit-handle";

export const ChanceNode = (_props: NodeProps) => {
  return (
    <>
      <div className="p-4 rounded-full bg-white border border-black">
        <ConnectionLimitHandle
          type="target"
          position={Position.Left}
          connectionCount={1}
        />
        <Handle type="source" position={Position.Right} />
      </div>
      <NodeToolbar isVisible position={Position.Bottom}>
        <label className="font-bold backdrop-blur">Chance Node</label>
      </NodeToolbar>
    </>
  );
};
