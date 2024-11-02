import { Handle, type Node, NodeProps, Position } from "@xyflow/react";
import classNames from "classnames";
import { TChanceNode } from "./chance-node";

type DecisionNodeData = {
  ev: number;
  chanceNodes: TChanceNode[];
};

export type TDecisionNode = Node<DecisionNodeData, "decisionNode">;

export const DecisionNode = ({
  data,
  selected,
  id,
}: NodeProps<TDecisionNode>) => {
  return (
    <div className="flex gap-2 items-center justify-center">
      <span className="nodrag hover:cursor-default select-text border border-black px-1 py-1/2 bg-blue-200 rounded-sm font-semibold text-black text-xs w-22 truncate">
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
