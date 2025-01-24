import { ReactFlowJsonObject } from "@xyflow/react";

type DecisionTreeInformative = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};

type DecisionTreeListResponse = DecisionTreeInformative[];

type DecisionTreeResponse = Omit<DecisionTreeInformative, "id"> & {
  tree: ReactFlowJsonObject;
};

type UpdateDecisionTreeRequest = {
  name?: string;
  tree?: ReactFlowJsonObject;
};

type CreateDecisionTreeRequest = {
  name: string;
  tree: ReactFlowJsonObject;
};

export type {
  CreateDecisionTreeRequest,
  DecisionTreeListResponse,
  DecisionTreeResponse,
  UpdateDecisionTreeRequest,
};
