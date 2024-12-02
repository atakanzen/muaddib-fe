import { Node, NodeProps, Position } from "@xyflow/react";
import classNames from "classnames";
import { ConnectionLimitHandle } from "../handles/connection-limit-handle";

type EndpointNodeData = {
  calculatedPayoff?: number;
};

export type TEndpointNode = Node<EndpointNodeData, "endpointNode">;

export const EndpointNode = ({
  selected,
  data: { calculatedPayoff },
}: NodeProps<TEndpointNode>) => {
  return (
    <div className="relative">
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
      <div className="absolute flex items-center justify-between nodrag hover:cursor-default select-text left-full top-1/2 -translate-y-1/2 ml-4 p-1 rounded bg-slate-500 border border-slate-600 text-white font-bold text-xss min-w-16 text-center">
        {calculatedPayoff !== undefined ? <span>$</span> : null}
        {calculatedPayoff !== undefined
          ? Intl.NumberFormat("en-US").format(calculatedPayoff)
          : "N/A"}
      </div>
    </div>
  );
};
