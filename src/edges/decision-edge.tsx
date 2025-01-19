import {
  BaseEdge,
  Edge,
  EdgeLabelRenderer,
  EdgeProps,
  getSimpleBezierPath,
} from "@xyflow/react";
import classNames from "classnames";
import {
  PayoffInput,
  PayoffType,
} from "../components/decision-tree/payoff-input";
import { changePayoffInputForDecisionEdge } from "../state/editor/store";

type DecisionEdgeData = {
  payoff: number;
  payoffType?: PayoffType;
  isHighlighted: boolean;
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
  selected,
  data: { payoff, payoffType, isHighlighted },
}: EdgeProps<TDecisionEdge>) => {
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
          "stroke-green-500 stroke-2": isHighlighted,
          "!stroke-green-700 stroke-2": isHighlighted && selected,
        })}
      />
      <EdgeLabelRenderer>
        {!isHighlighted && (
          <span
            className="text-black font-bold text-xl"
            style={{
              position: "absolute",
              transform: `translate(${labelX}px, ${labelY - 15}px)`,
            }}
          >
            //
          </span>
        )}
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
