import { ReactFlowProvider } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App.tsx";
import "./index.css";
import { store } from "./state/store.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ReactFlowProvider>
        <App />
      </ReactFlowProvider>
    </Provider>
  </React.StrictMode>
);
