import {
  CreateDecisionTreeRequest,
  DecisionTreeListResponse,
  DecisionTreeResponse,
  UpdateDecisionTreeRequest,
} from "@/types/dto";
import { baseAPI } from "./base";

const extendedDecisionTreeAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => {
    return {
      listDecisionTrees: builder.query<DecisionTreeListResponse, void>({
        query: () => ({ url: "decision-tree/list" }),
        providesTags: ["decisionTree"],
      }),
      getDecisionTreeByID: builder.query<DecisionTreeResponse, string>({
        query: (treeID) => ({ url: `decision-tree/get/${treeID}` }),
        providesTags: ["decisionTree"],
      }),
      createDecisionTree: builder.mutation<
        { id: string },
        CreateDecisionTreeRequest
      >({
        query: (requestBody) => ({
          url: `decision-tree/create`,
          method: "POST",
          body: requestBody,
        }),
        invalidatesTags: ["decisionTree"],
      }),
      updateDecisionTreeWithID: builder.mutation<
        void,
        { patch: UpdateDecisionTreeRequest; treeID: string }
      >({
        query: ({ patch, treeID }) => ({
          url: `decision-tree/update/${treeID}`,
          method: "PATCH",
          body: patch,
        }),
        invalidatesTags: ["decisionTree"],
      }),
      deleteDecisionTreeWithID: builder.mutation<void, { treeID: string }>({
        query: ({ treeID }) => ({
          url: `decision-tree/delete/${treeID}`,
          method: "DELETE",
        }),
        invalidatesTags: ["decisionTree"],
      }),
    };
  },
});

export const {
  useListDecisionTreesQuery,
  useGetDecisionTreeByIDQuery,
  useUpdateDecisionTreeWithIDMutation,
  useCreateDecisionTreeMutation,
  useDeleteDecisionTreeWithIDMutation,
} = extendedDecisionTreeAPI;
