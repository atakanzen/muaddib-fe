import { Handle, NodeProps, Position } from "@xyflow/react";

type DecisionNodeProps = {
  data: {
    ev: number;
  };
} & Omit<NodeProps, "data">;

export const DecisionNode = (props: DecisionNodeProps) => {
  return (
    <div className="flex gap-2 items-center justify-center">
      <span className="nodrag hover:cursor-default select-text border border-black px-1 py-1/2 bg-blue-200 rounded-sm font-semibold text-black text-xs w-22 truncate">
        EV: {props.data.ev ?? "N/A"}
      </span>
      <div className="w-8 h-8 bg-white text-black border border-black shadow-funky">
        <Handle
          type="source"
          position={Position.Right}
          className="absolute"
          id={props.id}
        />
      </div>
    </div>
  );
};
