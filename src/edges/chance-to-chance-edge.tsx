import {
  BaseEdge,
  Edge,
  EdgeLabelRenderer,
  EdgeProps,
  getSimpleBezierPath,
} from "@xyflow/react";
import classNames from "classnames";
import ChanceProbabilityInput from "../components/decision-tree/chance-probability-input";

type ChanceToChanceEdgeData = {
  probability: number;
  isSetByUser: boolean;
  isFaulty: boolean;
};

export type TChanceToChanceEdge = Omit<
  Edge<ChanceToChanceEdgeData, "chanceToChanceEdge">,
  "data"
> & {
  data: ChanceToChanceEdgeData;
};

const ChanceToChanceEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  selected,
  data: { isFaulty },
}: EdgeProps<TChanceToChanceEdge>) => {
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
            transform: `translate(-50%, -50%) translate(${centerX}px, ${
              centerY - 15
            }px)`,
          }}
        >
          <ChanceProbabilityInput edgeID={id} />
        </div>
      </EdgeLabelRenderer>
    </>
  );
};

export default ChanceToChanceEdge;
