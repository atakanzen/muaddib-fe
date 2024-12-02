import { Edge, Node } from "@xyflow/react";
import { TChanceEdge } from "../edges/chance-edge";
import { TDecisionEdge } from "../edges/decision-edge";
import { TChanceNode } from "../nodes/chance-node";
import { TDecisionNode } from "../nodes/decision-node";
import { TEndpointNode } from "../nodes/endpoint-node";
import { TTextNode } from "../nodes/text-node";

const isChanceNode = (node: Node): node is TChanceNode => {
  return node.type === "chanceNode";
};

const isDecisionNode = (node: Node): node is TDecisionNode => {
  return node.type === "decisionNode";
};

const isEndpointNode = (node: Node): node is TEndpointNode => {
  return node.type === "endpointNode";
};

const isTextNode = (node: Node): node is TTextNode => {
  return node.type === "textNode";
};

const isDecisionEdge = (edge: Edge): edge is TDecisionEdge => {
  return edge.type === "decisionEdge";
};

const isChanceEdge = (edge: Edge): edge is TChanceEdge => {
  return edge.type === "chanceEdge";
};

export {
  isChanceEdge,
  isChanceNode,
  isDecisionEdge,
  isDecisionNode,
  isEndpointNode,
  isTextNode,
};
