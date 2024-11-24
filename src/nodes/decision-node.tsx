import { Handle, type Node, NodeProps, Position } from "@xyflow/react";
import classNames from "classnames";

type DecisionNodeData = {
  ev: number;
};

export type TDecisionNode = Node<DecisionNodeData, "decisionNode">;

export const DecisionNode = ({
  data,
  selected,
  id,
}: NodeProps<TDecisionNode>) => {
  return (
    <div className="relative">
      <span className="absolute right-full top-1/2 -translate-y-1/2 mr-2 nodrag hover:cursor-default select-text border border-slate-600 p-1 bg-slate-500 rounded font-semibold text-white text-xss w-22 truncate">
        EV: {data.ev ?? "N/A"}
      </span>
      <div
        className={classNames(
          "w-8 h-8 bg-white text-black border border-black shadow-funky",
          { "border-orange-500": selected }
        )}
      >
        <Handle
          type="source"
          position={Position.Right}
          className="absolute"
          id={id}
        />
      </div>
    </div>
  );
};
