import { EditorLocalState } from "@/types/shared";

const sensorDemo: EditorLocalState = {
  nodes: [
    {
      id: "1",
      type: "decisionNode",
      position: {
        x: -400,
        y: 0,
      },
      data: {
        isRoot: true,
        ev: 400_000,
      },
    },
    {
      id: "2",
      type: "chanceNode",
      position: {
        x: 0,
        y: -50,
      },
      data: {
        ev: 400_000,
      },
    },
    {
      id: "3",
      type: "chanceNode",
      position: {
        x: 0,
        y: 50,
      },
      data: {
        ev: 310_000,
      },
    },
    {
      id: "4",
      type: "endpointNode",
      position: {
        x: 400,
        y: -80,
      },
      data: {
        calculatedPayoff: 900_000,
      },
    },
    {
      id: "5",
      type: "endpointNode",
      position: {
        x: 400,
        y: -20,
      },
      data: {
        calculatedPayoff: -100_000,
      },
    },
    {
      id: "6",
      type: "endpointNode",
      position: {
        x: 400,
        y: 20,
      },
      data: {
        calculatedPayoff: 390_000,
      },
    },
    {
      id: "7",
      type: "endpointNode",
      position: {
        x: 400,
        y: 80,
      },
      data: {
        calculatedPayoff: -10_000,
      },
    },
    {
      id: "8",
      type: "endpointNode",
      position: {
        x: 0,
        y: 150,
      },
      data: {
        calculatedPayoff: 0,
      },
    },
  ],
  edges: [
    {
      id: "1-2",
      source: "1",
      target: "2",
      animated: true,
      type: "decisionEdge",
      data: {
        payoff: -100_000,
        payoffType: "cost",
        isHighlighted: true,
      },
    },
    {
      id: "1-3",
      source: "1",
      target: "3",
      animated: true,
      type: "decisionEdge",
      data: {
        payoff: -10_000,
        payoffType: "cost",
      },
    },
    {
      id: "1-8",
      source: "1",
      target: "8",
      animated: true,
      type: "decisionEdge",
      data: {
        payoff: 0,
      },
    },
    {
      id: "2-4",
      source: "2",
      target: "4",
      animated: true,
      type: "chanceToEndpointEdge",
      data: {
        probability: 50,
        isSetByUser: false,
        payoff: 1_000_000,
        payoffType: "profit",
      },
    },
    {
      id: "2-5",
      source: "2",
      target: "5",
      animated: true,
      type: "chanceToEndpointEdge",
      data: {
        probability: 50,
        isSetByUser: false,
        payoff: 0,
      },
    },
    {
      id: "3-6",
      source: "3",
      target: "6",
      animated: true,
      type: "chanceToEndpointEdge",
      data: {
        probability: 80,
        isSetByUser: false,
        payoff: 400_000,
        payoffType: "profit",
      },
    },
    {
      id: "3-7",
      source: "3",
      target: "7",
      animated: true,
      type: "chanceToEndpointEdge",
      data: {
        probability: 20,
        isSetByUser: false,
        payoff: 0,
      },
    },
  ],
  viewport: {
    x: 0,
    y: 0,
    zoom: 1,
  },
  paneContextMenu: {
    position: { x: 0, y: 0 },
    visible: false,
  },
};

export { sensorDemo };
