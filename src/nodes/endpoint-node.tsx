import { NodeProps, Position } from "@xyflow/react";
import classNames from "classnames";
import { ConnectionLimitHandle } from "../handles/connection-limit-handle";

export const EndpointNode = ({ selected }: NodeProps) => {
  return (
    <div
      className={classNames("rounded-full bg-black h-4 w-4", {
        "bg-orange-500": selected,
      })}
    >
      <ConnectionLimitHandle
        connectionCount={1}
        type="target"
        position={Position.Left}
      />
    </div>
  );
};
