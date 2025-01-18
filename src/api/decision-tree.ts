import {
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
    };
  },
});

export const {
  useListDecisionTreesQuery,
  useGetDecisionTreeByIDQuery,
  useUpdateDecisionTreeWithIDMutation,
} = extendedDecisionTreeAPI;
