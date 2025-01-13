import { ReactFlowProvider } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router";
import "./index.css";
import About from "./pages/About.tsx";
import Editor from "./pages/Editor.tsx";
import Home from "./pages/Home.tsx";
import { store } from "./state/store.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <ReactFlowProvider>
          <Routes>
            <Route path="/" Component={Home} />
            <Route path="/editor" Component={Editor} />
            <Route path="/about-us" Component={About} />
          </Routes>
        </ReactFlowProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
