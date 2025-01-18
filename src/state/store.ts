import { configureStore } from "@reduxjs/toolkit";

import { baseAPI } from "@/api/base";
import editorReducer from "./editor/store";

export const store = configureStore({
  reducer: {
    editor: editorReducer,
    [baseAPI.reducerPath]: baseAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseAPI.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
