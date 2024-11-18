import { Handle, NodeProps, Position } from "@xyflow/react";
import classNames from "classnames";
import { ConnectionLimitHandle } from "../handles/connection-limit-handle";

export const ChanceNode = ({ selected }: NodeProps) => {
  return (
    <>
      <div
        className={classNames(
          "p-4 flex items-center justify-center rounded-full bg-white border border-black",
          { "border-orange-500": selected }
        )}
      >
        <ConnectionLimitHandle
          type="target"
          position={Position.Left}
          connectionCount={1}
          onConnect={() => alert("connect")}
        />
        <Handle type="source" position={Position.Right} />
      </div>
    </>
  );
};
