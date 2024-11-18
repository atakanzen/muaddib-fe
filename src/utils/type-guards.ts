import { Edge, Node } from "@xyflow/react";
import { TValueEdge } from "../edges/value-edge";
import { TDecisionNode } from "../nodes/decision-node";
import { TTextNode } from "../nodes/text-node";

const isDecisionNode = (node: Node): node is TDecisionNode => {
  return node.type === "decisionNode";
};

const isTextNode = (node: Node): node is TTextNode => {
  return node.type === "textNode";
};

const isValueEdge = (edge: Edge): edge is TValueEdge => {
  return edge.type === "valueEdge";
};

export { isDecisionNode, isTextNode, isValueEdge };
