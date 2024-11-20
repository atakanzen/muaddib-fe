import { EditorState } from "../editor/store";

const sensorDemo: EditorState = {
  nodes: [
    {
      id: "1",
      type: "decisionNode",
      position: {
        x: -400,
        y: 0,
      },
      data: {},
    },
    {
      id: "2",
      type: "chanceNode",
      position: {
        x: 0,
        y: -50,
      },
      data: {},
    },
    {
      id: "3",
      type: "chanceNode",
      position: {
        x: 0,
        y: 50,
      },
      data: {},
    },
    {
      id: "4",
      type: "endpointNode",
      position: {
        x: 200,
        y: -80,
      },
      data: {},
    },
    {
      id: "5",
      type: "endpointNode",
      position: {
        x: 200,
        y: -20,
      },
      data: {},
    },
    {
      id: "6",
      type: "endpointNode",
      position: {
        x: 200,
        y: 20,
      },
      data: {},
    },
    {
      id: "7",
      type: "endpointNode",
      position: {
        x: 200,
        y: 80,
      },
      data: {},
    },
    {
      id: "8",
      type: "endpointNode",
      position: {
        x: 10,
        y: 150,
      },
      data: {},
    },
  ],
  edges: [
    {
      id: "1-2",
      source: "1",
      target: "2",
      animated: true,
      type: "valueEdge",
      data: {
        value: -100_000,
        valueType: "cost",
      },
    },
    {
      id: "1-3",
      source: "1",
      target: "3",
      animated: true,
      type: "valueEdge",
      data: {
        value: -10_000,
        valueType: "cost",
      },
    },
    {
      id: "1-8",
      source: "1",
      target: "8",
      animated: true,
    },
    {
      id: "2-4",
      source: "2",
      target: "4",
      animated: true,
      type: "chanceEdge",
      data: {
        probability: 50,
        isSetByUser: false,
      },
    },
    {
      id: "2-5",
      source: "2",
      target: "5",
      animated: true,
      type: "chanceEdge",
      data: {
        probability: 50,
        isSetByUser: false,
      },
    },
    {
      id: "3-6",
      source: "3",
      target: "6",
      animated: true,
      type: "chanceEdge",
      data: {
        probability: 80,
        isSetByUser: false,
      },
    },
    {
      id: "3-7",
      source: "3",
      target: "7",
      animated: true,
      type: "chanceEdge",
      data: {
        probability: 20,
        isSetByUser: false,
      },
    },
  ],
  paneContextMenu: {
    position: { x: 0, y: 0 },
    visible: false,
  },
};

export { sensorDemo };
