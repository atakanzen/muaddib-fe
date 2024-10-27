import { NodeTypes } from "@xyflow/react";
import { ChanceNode } from "../nodes/chance-node";
import { DecisionNode } from "../nodes/decision-node";
import { EndpointNode } from "../nodes/endpoint-node";
import TextNode from "../nodes/text-node";

const customNodeTypes: NodeTypes = {
  textUpdater: TextNode,
  decisionNode: DecisionNode,
  chanceNode: ChanceNode,
  endpointNode: EndpointNode,
};

export { customNodeTypes };
