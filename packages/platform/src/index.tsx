import React from "react";
import { createRoot, Root } from "react-dom/client";
import { App } from "./pages/App/App";

let root: Root | null = null;

export const getPlatformEntrypoint = () => ({
  mount: () => {
    const container = document.getElementById("root");

    if (container && container.childElementCount === 0) {
      root = createRoot(container);
    }

    root?.render(
      <React.StrictMode>
        <div>
          <App />
        </div>
      </React.StrictMode>
    );
  },
  unmount: () => {
    root?.unmount();
  },
});
