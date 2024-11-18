import { useMemo } from "react";
import { selectEdges } from "../state/editor/store";
import { useAppSelector } from "../state/hooks";

export const useParentNodeID = (childNodeID: string) => {
  const edges = useAppSelector(selectEdges);

  const parentNodeID = useMemo(() => {
    const parentEdge = edges.find((e) => e.target === childNodeID);
    return parentEdge ? parentEdge.source : null;
  }, [childNodeID, edges]);

  return parentNodeID;
};
