import { Handle, type Node, NodeProps, Position } from "@xyflow/react";
import classNames from "classnames";

type DecisionNodeData = {
  ev?: number;
  isRoot: boolean;
};

export type TDecisionNode = Node<DecisionNodeData, "decisionNode">;

export const DecisionNode = ({
  data: { ev, isRoot },
  selected,
  id,
}: NodeProps<TDecisionNode>) => {
  console.log(ev);
  return (
    <div data-isroot={isRoot} className="relative">
      {ev !== undefined && (
        <span className="absolute right-full top-1/2 -translate-y-1/2 mr-2 nodrag hover:cursor-default select-text border border-slate-600 p-1 bg-slate-500 rounded font-semibold text-white text-xss w-22 truncate">
          EV: ${Intl.NumberFormat("en-US").format(ev)}
        </span>
      )}
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
        {!isRoot && (
          <Handle
            type="target"
            position={Position.Left}
            className="absolute"
            id={id}
          />
        )}
      </div>
    </div>
  );
};
