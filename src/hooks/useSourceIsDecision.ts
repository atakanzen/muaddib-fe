import { selectNodes } from "../state/editor/store";
import { useAppSelector } from "../state/hooks";

export const useSourceIsDecision = (sourceId: string) => {
  const nodes = useAppSelector(selectNodes);

  const sourceNode = nodes.find((n) => n.id === sourceId);
  if (!sourceNode) return false;

  return sourceNode.type === "decisionNode";
};
