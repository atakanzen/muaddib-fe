import { NodeTypes } from "@xyflow/react";
import { ChanceNode } from "../nodes/chance-node";
import { DecisionNode } from "../nodes/decision-node";
import { EndpointNode } from "../nodes/endpoint-node";
import TextNode from "../nodes/text-node";

export const DECISION_NODE_TYPE = "decisionNode";
export const CHANCE_NODE_TYPE = "chanceNode";
export const ENDPOINT_NODE_TYPE = "endpointNode";
export const TEXT_NODE_TYPE = "textNode";

const customNodeTypes: NodeTypes = {
  textNode: TextNode,
  decisionNode: DecisionNode,
  chanceNode: ChanceNode,
  endpointNode: EndpointNode,
};

export { customNodeTypes };
