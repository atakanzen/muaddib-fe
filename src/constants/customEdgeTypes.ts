import { EdgeTypes } from "@xyflow/react";
import ChanceToChanceEdge from "../edges/chance-to-chance-edge";
import ChanceToEndpointEdge from "../edges/chance-to-endpoint-edge";
import DecisionEdge from "../edges/decision-edge";

const customEdgeTypes: EdgeTypes = {
  decisionEdge: DecisionEdge,
  chanceToEndpointEdge: ChanceToEndpointEdge,
  chanceToChanceEdge: ChanceToChanceEdge,
};

export { customEdgeTypes };
