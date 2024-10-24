import { NodeTypes } from "@xyflow/react";
import TextUpdaterNode from "../nodes/text-updater-node";
import { DecisionNode } from "../nodes/decision-node";
import { ChanceNode } from "../nodes/chance-node";
import { EndpointNode } from "../nodes/endpoint-node";

const customNodeTypes: NodeTypes = {
  textUpdater: TextUpdaterNode,
  decisionNode: DecisionNode,
  chanceNode: ChanceNode,
  endpointNode: EndpointNode,
};

export { customNodeTypes };
