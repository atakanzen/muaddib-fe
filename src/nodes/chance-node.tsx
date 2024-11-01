import { Handle, NodeProps, NodeToolbar, Position } from "@xyflow/react";
import ChanceProbability from "../components/chanceProbability";
import { ConnectionLimitHandle } from "../handles/connection-limit-handle";

type ChanceNodeProps = {
  data: {
    probability: number;
  };
} & Omit<NodeProps, "data">;

export const ChanceNode = ({ data, selected }: ChanceNodeProps) => {
  return (
    <>
      <div
        className={`p-4 flex items-center justify-center rounded-full bg-white border border-black ${
          selected && "border-orange-500"
        }`}
      >
        <ConnectionLimitHandle
          type="target"
          position={Position.Left}
          connectionCount={1}
        />
        <Handle type="source" position={Position.Right} />
        <NodeToolbar isVisible position={Position.Bottom} className="nodrag">
          <ChanceProbability probability={data.probability} />
        </NodeToolbar>
      </div>
    </>
  );
};
