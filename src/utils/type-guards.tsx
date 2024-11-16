import { Node } from "@xyflow/react";
import { TChanceNode } from "../nodes/chance-node";
import { TDecisionNode } from "../nodes/decision-node";
import { TTextNode } from "../nodes/text-node";

export const isChanceNode = (node: Node): node is TChanceNode => {
  return node.type === "chanceNode";
};

export const isDecisionNode = (node: Node): node is TDecisionNode => {
  return node.type === "decisionNode";
};

export const isTextNode = (node: Node): node is TTextNode => {
  return node.type === "textNode";
};
