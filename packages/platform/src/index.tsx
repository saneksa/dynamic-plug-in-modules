import React from "react";
import { createRoot, Root } from "react-dom/client";
import { App } from "./pages/App/App";

const container = document.getElementById("root");

let root: Root | null = null;

if (container) {
  root = createRoot(container);
}

export const getPlatformEntrypoint = () => {
  root &&
    root.render(
      <React.StrictMode>
        <div>
          <App />
        </div>
      </React.StrictMode>
    );
};
