import { NodeTypes } from "@xyflow/react";
import TextUpdaterNode from "../nodes/text-updater-node";
import { DecisionNode } from "../nodes/decision-node";
import { ChanceNode } from "../nodes/chance-node";

const customNodeTypes: NodeTypes = {
  textUpdater: TextUpdaterNode,
  decisionNode: DecisionNode,
  chanceNode: ChanceNode,
};

export { customNodeTypes };
