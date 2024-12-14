import { Edge, Node } from "@xyflow/react";
import { TChanceToChanceEdge } from "../edges/chance-to-chance-edge";
import { TChanceToEndpointEdge } from "../edges/chance-to-endpoint-edge";
import { TEndpointNode } from "../nodes/endpoint-node";
import { EditorState } from "../state/editor/store";
import {
  isChanceNode,
  isChanceToChanceEdge,
  isChanceToEndpointEdge,
  isDecisionEdge,
  isDecisionNode,
  isEndpointNode,
} from "./type-guards";

const calculateTotalPayoff = (nodeID: string, edges: Edge[]): number => {
  const incomingEdges = edges.filter((e) => e.target === nodeID);

  // We hit the root node here.
  if (incomingEdges.length === 0) {
    return 0;
  }

  return incomingEdges.reduce((total, edge) => {
    const edgePayoff =
      isChanceToEndpointEdge(edge) || isDecisionEdge(edge)
        ? edge.data.payoff || 0
        : 0;

    return total + edgePayoff + calculateTotalPayoff(edge.source, edges); // Recurse through the source
  }, 0);
};

// Find all endpoint nodes connected to a specific node
const findConnectedEndpoints = (
  nodeID: string,
  edges: Edge[],
  nodes: Node[]
): TEndpointNode[] => {
  const connectedEdges = edges.filter((e) => e.source === nodeID);
  const endpoints: TEndpointNode[] = [];

  connectedEdges.forEach((edge) => {
    const targetNode = nodes.find((n) => n.id === edge.target);
    if (targetNode && isEndpointNode(targetNode)) {
      endpoints.push(targetNode);
    } else if (targetNode) {
      // Traverse further if not an endpoint
      endpoints.push(...findConnectedEndpoints(targetNode.id, edges, nodes));
    }
  });

  return endpoints;
};

function handleEdgeChange(
  edgeID: string,
  state: EditorState,
  isFaultyProbability?: boolean
) {
  const edge = state.edges.find((e) => e.id === edgeID);
  if (!edge) {
    console.error("Edge not found");
    return;
  }

  if (isDecisionEdge(edge)) {
    recalculateFromNode(edge.target, state, new Set());
  } else if (isChanceToChanceEdge(edge) || isChanceToEndpointEdge(edge)) {
    recalculateFromNode(edge.source, state, new Set(), isFaultyProbability);
  }
}

function recalculateFromNode(
  nodeID: string,
  state: EditorState,
  visited: Set<string>,
  isFaultyProbability?: boolean
) {
  if (visited.has(nodeID)) return;
  visited.add(nodeID);

  const currentNode = state.nodes.find((n) => n.id === nodeID);
  if (!currentNode) return;

  if (isEndpointNode(currentNode)) {
    currentNode.data.calculatedPayoff = calculateTotalPayoff(
      nodeID,
      state.edges
    );
  } else if (isChanceNode(currentNode)) {
    if (isFaultyProbability) {
      currentNode.data.ev = undefined;
    } else {
      currentNode.data.ev = calculateEVForChanceNode(nodeID, state);
    }
  } else if (isDecisionNode(currentNode)) {
    if (isFaultyProbability) {
      currentNode.data.ev = undefined;
    } else {
      currentNode.data.ev = calculateEVForDecisionNode(nodeID, state);
    }
  }

  // Propagate upwards through all connected edges
  const incomingEdges = state.edges.filter((e) => e.target === nodeID);
  incomingEdges.forEach((parentEdge) =>
    recalculateFromNode(parentEdge.source, state, visited)
  );
}

function calculateEVForChanceNode(nodeID: string, state: EditorState): number {
  const outgoingEdges = state.edges.filter((e) => e.source === nodeID) as (
    | TChanceToEndpointEdge
    | TChanceToChanceEdge
  )[];
  return outgoingEdges.reduce((sum, edge) => {
    const targetNode = state.nodes.find((n) => n.id === edge.target);
    if (!targetNode) return 0;
    const targetEV = isEndpointNode(targetNode)
      ? targetNode.data.calculatedPayoff ?? 0
      : isChanceNode(targetNode)
      ? targetNode.data.ev ?? 0
      : isDecisionNode(targetNode)
      ? targetNode.data.ev ?? 0
      : 0;

    return sum + (edge.data.probability / 100) * targetEV;
  }, 0);
}

function calculateEVForDecisionNode(
  nodeID: string,
  state: EditorState
): number {
  const outgoingEdges = state.edges.filter((e) => e.source === nodeID);
  return outgoingEdges.reduce((maxEV, edge) => {
    const targetNode = state.nodes.find((n) => n.id === edge.target);
    if (!targetNode) return 0;
    const targetEV =
      isChanceNode(targetNode) || isDecisionNode(targetNode)
        ? targetNode.data.ev ?? 0
        : isEndpointNode(targetNode)
        ? targetNode.data.calculatedPayoff ?? 0
        : 0;

    return Math.max(maxEV, targetEV);
  }, Number.NEGATIVE_INFINITY);
}

export { calculateTotalPayoff, findConnectedEndpoints, handleEdgeChange };
