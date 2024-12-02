import { Edge, Node } from "@xyflow/react";
import { TChanceEdge } from "../edges/chance-edge";
import { TEndpointNode } from "../nodes/endpoint-node";
import { EditorState } from "../state/editor/store";
import { toFixedFloat } from "./toFixedFloat";
import {
  isChanceEdge,
  isChanceNode,
  isDecisionEdge,
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
      isChanceEdge(edge) || isDecisionEdge(edge) ? edge.data.payoff || 0 : 0;

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

function calculateEVForChanceNode(nodeID: string, state: EditorState) {
  const node = state.nodes.find((n) => n.id === nodeID);
  if (!node || !isChanceNode(node)) return;

  const outgoingEdges = state.edges.filter(
    (e) => e.source === nodeID && isChanceEdge(e)
  ) as TChanceEdge[];

  if (outgoingEdges.length === 0) {
    // Base case: no outgoing edges
    node.data.ev = 0;
    return;
  }

  const totalEV = outgoingEdges.reduce((sum, edge) => {
    const targetNode = state.nodes.find(
      (n) => n.id === edge.target && isEndpointNode(n)
    ) as TEndpointNode | undefined;

    if (!targetNode) {
      console.warn(`Target endpoint node not found for edge ${edge.id}`);
      return sum; // Skip edge if target node is missing or not an endpoint
    }

    const calculatedTotalPayoff = targetNode.data.calculatedPayoff ?? 0;
    const edgeProbability = edge.data.probability ?? 0;

    // Calculate the contribution of this edge to the EV
    const edgeEVContribution = (edgeProbability / 100) * calculatedTotalPayoff;

    return sum + edgeEVContribution;
  }, 0);

  node.data.ev = toFixedFloat(totalEV, 2);

  // Propagate EV calculation to parent nodes (reverse propagation)
  const incomingEdges = state.edges.filter((e) => e.target === nodeID);
  incomingEdges.forEach((edge) => calculateEVForChanceNode(edge.source, state));
}

export {
  calculateEVForChanceNode,
  calculateTotalPayoff,
  findConnectedEndpoints,
};
