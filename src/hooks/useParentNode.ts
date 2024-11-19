import { useMemo } from "react";
import { selectEdges } from "../state/editor/store";
import { useAppSelector } from "../state/hooks";

export const useSourceNodeID = (edgeID: string) => {
  const edges = useAppSelector(selectEdges);

  const sourceNodeID = useMemo(() => {
    const edge = edges.find((e) => e.id === edgeID);
    return edge ? edge.source : null;
  }, [edgeID, edges]);

  return sourceNodeID;
};
