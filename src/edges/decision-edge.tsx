import {
  BaseEdge,
  Edge,
  EdgeLabelRenderer,
  EdgeProps,
  getSimpleBezierPath,
} from "@xyflow/react";
import {
  PayoffInput,
  PayoffType,
} from "../components/decision-tree/payoff-input";
import { changePayoffInputForDecisionEdge } from "../state/editor/store";

type DecisionEdgeData = {
  payoff: number;
  payoffType?: PayoffType;
};

export type TDecisionEdge = Omit<
  Edge<DecisionEdgeData, "decisionEdge">,
  "data"
> & {
  data: DecisionEdgeData;
};

const DecisionEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  data: { payoff, payoffType },
}: EdgeProps<TDecisionEdge>) => {
  const [edgePath] = getSimpleBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

  return (
    <>
      <BaseEdge id={id} path={edgePath} />
      <EdgeLabelRenderer>
        <PayoffInput
          id={id}
          payoff={payoff}
          payoffType={payoffType}
          transform={`translate(-120%, -50%) translate(${targetX}px, ${targetY}px)`}
          action={changePayoffInputForDecisionEdge}
        />
      </EdgeLabelRenderer>
    </>
  );
};

export default DecisionEdge;
