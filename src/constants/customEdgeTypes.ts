import { EdgeTypes } from "@xyflow/react";
import ChanceEdge from "../edges/chance-edge";
import ValueEdge from "../edges/value-edge";

const customEdgeTypes: EdgeTypes = {
  valueEdge: ValueEdge,
  chanceEdge: ChanceEdge,
};

export { customEdgeTypes };
