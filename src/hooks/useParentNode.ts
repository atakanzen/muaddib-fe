import { useReactFlow } from "@xyflow/react";
import { useMemo } from "react";

export const useParentNodeID = (childNodeID: string) => {
  const { getEdges } = useReactFlow();

  const parentNodeID = useMemo(() => {
    const edges = getEdges();
    const parentEdge = edges.find((e) => e.target === childNodeID);
    return parentEdge ? parentEdge.source : null;
  }, [childNodeID, getEdges]);

  return parentNodeID;
};
