import { Handle, Node, NodeProps, Position } from "@xyflow/react";
import classNames from "classnames";
import { ConnectionLimitHandle } from "../handles/connection-limit-handle";

type ChanceNodeData = {
  ev?: number;
};

export type TChanceNode = Node<ChanceNodeData, "chanceNode">;

export const ChanceNode = ({
  selected,
  data: { ev },
}: NodeProps<TChanceNode>) => {
  return (
    <div className="relative">
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
      <div className="absolute nodrag hover:cursor-default select-text w-18 border border-slate-600 text-center p-1 bg-slate-500 text-white mt-2 text-xss font-bold rounded left-1/2 top-full -translate-x-1/2">
        ${ev !== undefined ? Intl.NumberFormat("en-US").format(ev) : "N/A"}
      </div>
    </div>
  );
};
