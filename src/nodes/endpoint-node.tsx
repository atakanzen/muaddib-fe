import { NodeProps, Position } from "@xyflow/react";
import { ConnectionLimitHandle } from "../handles/connection-limit-handle";

export const EndpointNode = ({ selected }: NodeProps) => {
  return (
    <div
      className={`rounded-full bg-black h-4 w-4 ${selected && "bg-orange-500"}`}
    >
      <ConnectionLimitHandle
        connectionCount={1}
        type="target"
        position={Position.Left}
      />
    </div>
  );
};
