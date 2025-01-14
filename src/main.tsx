import { ReactFlowProvider } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router";
import { AuthProvider } from "./context/Contexts.tsx";
import "./index.css";
import About from "./pages/About.tsx";
import Auth from "./pages/Auth.tsx";
import Editor from "./pages/Editor.tsx";
import Home from "./pages/Home.tsx";
import Layout from "./pages/Layout.tsx";
import NotFound from "./pages/NotFound.tsx";
import { store } from "./state/store.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Provider store={store}>
          <ReactFlowProvider>
            <Routes>
              <Route path="/auth" Component={Auth} />
              <Route element={<Layout />}>
                <Route path="/" Component={Home} />
                <Route path="/editor" Component={Editor} />
                <Route path="/about-us" Component={About} />
                <Route path="*" Component={NotFound} />
              </Route>
            </Routes>
          </ReactFlowProvider>
        </Provider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
