import { Handle, Node, NodeProps, NodeToolbar, Position } from "@xyflow/react";
import classNames from "classnames";
import ChanceProbabilityInput from "../components/chance-probability-input";
import { ConnectionLimitHandle } from "../handles/connection-limit-handle";

type ChanceNodeData = {
  probability: number;
};

export type TChanceNode = Node<ChanceNodeData, "chanceNode">;

export const ChanceNode = ({ data, selected, id }: NodeProps<TChanceNode>) => {
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
        />
        <Handle type="source" position={Position.Right} />
        <NodeToolbar isVisible position={Position.Bottom} className="nodrag">
          <ChanceProbabilityInput nodeID={id} probability={data.probability} />
        </NodeToolbar>
      </div>
    </>
  );
};
