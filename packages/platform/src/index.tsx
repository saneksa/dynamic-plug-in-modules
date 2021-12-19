import React from "react";
import ReactDOM from "react-dom";
import { App } from "./pages/App/App";

export const getPlatformEntrypoint = () =>
  ReactDOM.render(
    <React.StrictMode>
      <div>
        <App />
      </div>
    </React.StrictMode>,
    document.getElementById("root")
  );
