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
  const [edgePath] = getSimpleBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

  const centerX = Math.max((sourceX + targetX) / 2, sourceX);
  const centerY = (sourceY + targetY) / 2;

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
            className="text-black font-bold text-2xl"
            style={{
              position: "absolute",
              transform: `translate(-120%, -60%) translate(${centerX}px, ${centerY}px)`,
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
