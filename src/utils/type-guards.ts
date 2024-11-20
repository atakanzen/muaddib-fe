import { Edge, Node } from "@xyflow/react";
import { TChanceEdge } from "../edges/chance-edge";
import { TDecisionEdge } from "../edges/decision-edge";
import { TDecisionNode } from "../nodes/decision-node";
import { TTextNode } from "../nodes/text-node";

const isDecisionNode = (node: Node): node is TDecisionNode => {
  return node.type === "decisionNode";
};

const isTextNode = (node: Node): node is TTextNode => {
  return node.type === "textNode";
};

const isValueEdge = (edge: Edge): edge is TDecisionEdge => {
  return edge.type === "decisionEdge";
};

const isChanceEdge = (edge: Edge): edge is TChanceEdge => {
  return edge.type === "chanceEdge";
};

export { isChanceEdge, isDecisionNode, isTextNode, isValueEdge };
