import { EdgeTypes } from "@xyflow/react";
import ChanceEdge from "../edges/chance-edge";
import DecisionEdge from "../edges/decision-edge";

const customEdgeTypes: EdgeTypes = {
  decisionEdge: DecisionEdge,
  chanceEdge: ChanceEdge,
};

export { customEdgeTypes };
