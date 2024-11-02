import { Node } from "@xyflow/react";
import { TChanceNode } from "../nodes/chance-node";
import { TDecisionNode } from "../nodes/decision-node";

export const isChanceNode = (node: Node): node is TChanceNode => {
  return node.type === "chanceNode";
};

export const isDecisionNode = (node: Node): node is TDecisionNode => {
  return node.type === "decisionNode";
};
