import { BaseEdge, EdgeProps, getSimpleBezierPath } from "@xyflow/react";

const BezierEdge = ({ id, sourceX, sourceY, targetX, targetY }: EdgeProps) => {
  const [edgePath] = getSimpleBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });
  return (
    <>
      <BaseEdge id={id} path={edgePath} />
    </>
  );
};

export default BezierEdge;
