import {
  BaseEdge,
  Edge,
  EdgeLabelRenderer,
  EdgeProps,
  getSimpleBezierPath,
} from "@xyflow/react";
import classNames from "classnames";
import ChanceProbabilityInput from "../components/decision-tree/chance-probability-input";
import {
  PayoffInput,
  PayoffType,
} from "../components/decision-tree/payoff-input";
import { changePayoffInputForChanceEdge } from "../state/editor/store";

type ChanceToEndpointEdgeData = {
  probability: number;
  isSetByUser: boolean;
  payoff: number;
  payoffType?: PayoffType;
  isFaulty: boolean;
};

export type TChanceToEndpointEdge = Omit<
  Edge<ChanceToEndpointEdgeData, "chanceToEndpointEdge">,
  "data"
> & {
  data: ChanceToEndpointEdgeData;
};

const ChanceToEndpointEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  selected,
  data: { payoff, payoffType: payOffType, isFaulty },
}: EdgeProps<TChanceToEndpointEdge>) => {
  const [edgePath, labelX, labelY] = getSimpleBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

  return (
    <>
      <BaseEdge
        id={id}
        path={edgePath}
        className={classNames({
          "stroke-red-500": isFaulty,
          "!stroke-red-700": isFaulty && selected,
        })}
      />
      <EdgeLabelRenderer>
        <div
          className="absolute"
          style={{
            transform: `translate(${labelX}px, ${labelY - 15}px)`,
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

export default ChanceToEndpointEdge;
