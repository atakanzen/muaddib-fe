import {
  BaseEdge,
  Edge,
  EdgeLabelRenderer,
  EdgeProps,
  getSimpleBezierPath,
} from "@xyflow/react";
import ChanceProbabilityInput from "../components/chance-probability-input";

type ChanceToChanceEdgeData = {
  probability: number;
  isSetByUser: boolean;
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
      </EdgeLabelRenderer>
    </>
  );
};

export default ChanceToChanceEdge;
