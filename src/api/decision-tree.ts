import { DecisionTreeListResponse } from "@/types/dto";
import { baseAPI } from "./base";

const extendedDecisionTreeAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    listDecisionTrees: builder.query<DecisionTreeListResponse, void>({
      query: () => ({ url: "decision-tree/list" }),
    }),
  }),
});

export const { useListDecisionTreesQuery } = extendedDecisionTreeAPI;
