import {
  BaseEdge,
  Edge,
  EdgeLabelRenderer,
  EdgeProps,
  getSimpleBezierPath,
} from "@xyflow/react";
import ChanceProbabilityInput from "../components/chance-probability-input";

type ChanceEdgeData = {
  probability: number;
  isSetByUser: boolean;
};

export type TChanceEdge = Omit<Edge<ChanceEdgeData, "chanceEdge">, "data"> & {
  data: ChanceEdgeData;
};

const ChanceEdge = ({ id, sourceX, sourceY, targetX, targetY }: EdgeProps) => {
  const [edgePath] = getSimpleBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

  const centerX = (sourceX + targetX) / 2;
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

export default ChanceEdge;
