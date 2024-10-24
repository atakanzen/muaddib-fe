import { Position } from "@xyflow/react";
import { ConnectionLimitHandle } from "../handles/connection-limit-handle";

export const EndpointNode = () => {
  return (
    <div className="rounded-full bg-black h-4 w-4">
      <ConnectionLimitHandle
        connectionCount={1}
        type="target"
        position={Position.Left}
      />
    </div>
  );
};
