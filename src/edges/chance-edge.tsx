import {
  BaseEdge,
  Edge,
  EdgeLabelRenderer,
  EdgeProps,
  getSimpleBezierPath,
} from "@xyflow/react";
import ChanceProbabilityInput from "../components/chance-probability-input";
import { PayoffInput, PayoffType } from "../components/payoff-input";
import { changePayoffInputForChanceEdge } from "../state/editor/store";

type ChanceEdgeData = {
  probability: number;
  isSetByUser: boolean;
  payoff: number;
  payoffType?: PayoffType;
};

export type TChanceEdge = Omit<Edge<ChanceEdgeData, "chanceEdge">, "data"> & {
  data: ChanceEdgeData;
};

const ChanceEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  data: { payoff, payoffType: payOffType },
}: EdgeProps<TChanceEdge>) => {
  const [edgePath] = getSimpleBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

  const centerX = (sourceX + targetX) / 3;
  const centerY = (sourceY + targetY) / 2;

  return (
    <>
      <BaseEdge id={id} path={edgePath} />
      <EdgeLabelRenderer>
        <div
          className="absolute"
          style={{
            transform: `translate(-50%, -50%) translate(${centerX}px, ${
              centerY - 15
            }px)`,
          }}
        >
          <ChanceProbabilityInput edgeID={id} />
        </div>
        <PayoffInput
          id={id}
          transform={`translate(-115%, -50%) translate(${targetX}px, ${targetY}px)`}
          payoff={payoff}
          payoffType={payOffType}
          action={changePayoffInputForChanceEdge}
        />
      </EdgeLabelRenderer>
    </>
  );
};

export default ChanceEdge;
