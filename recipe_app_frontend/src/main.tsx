import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./lib/theme.css";
import { FeatureFlagsProvider } from "./context/FeatureFlagsContext";

const container = document.getElementById("app")!;
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <FeatureFlagsProvider>
      <App />
    </FeatureFlagsProvider>
  </React.StrictMode>
);
