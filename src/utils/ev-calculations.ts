import { Edge, Node } from "@xyflow/react";
import { TEndpointNode } from "../nodes/endpoint-node";
import { isChanceEdge, isDecisionEdge, isEndpointNode } from "./type-guards";

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

export { calculateTotalPayoff, findConnectedEndpoints };
