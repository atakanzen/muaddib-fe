import { Handle, NodeProps, Position } from "@xyflow/react";

type DecisionNodeProps = {
  data: {
    title: string;
  };
} & Omit<NodeProps, "data">;

export const DecisionNode = (props: DecisionNodeProps) => {
  return (
    <div className="flex gap-2 items-center justify-center">
      <span className="nodrag hover:cursor-default select-text border border-black px-1 py-1/2 bg-gray-100 rounded-sm text-emerald-500 text-xs  w-22 truncate">
        EV: $87.24
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
