import {
  BaseEdge,
  EdgeLabelRenderer,
  EdgeProps,
  getBezierPath,
  useReactFlow,
} from "reactflow";

const CustomEdge = ({ id, sourceX, sourceY, targetX, targetY }: EdgeProps) => {
  const { setEdges } = useReactFlow();
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });
  return (
    <>
      <BaseEdge id={id} path={edgePath} />
      <EdgeLabelRenderer>
        <button
          className="absolute nodrag nopan bg-slate-300 text-black rounded px-1"
          style={{
            pointerEvents: "all",
            transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
          }}
          onClick={() => setEdges((edges) => edges.filter((e) => e.id !== id))}
        >
          delete
        </button>
      </EdgeLabelRenderer>
    </>
  );
};

export default CustomEdge;
