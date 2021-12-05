import React from "react";
import ReactDOM from "react-dom";

export const getPlatformEntrypoint = () =>
  ReactDOM.render(
    <React.StrictMode>
      <div>24434</div>
    </React.StrictMode>,
    document.getElementById("root")
  );

const sum = (a: number, b: number) => a + b;

console.warn("sdwwwfsf", sum(1, 4));

getPlatformEntrypoint();

export {};
