import { configure } from "mobx";

configure({
  useProxies: "never",
});

import { Expander } from "./Expander/Expander";

module?.hot?.accept?.();

function importAll(ctx: __WebpackModuleApi.RequireContext) {
  ctx.keys().forEach(ctx);
}

export * from "./Expander/Expander";
export * from "./Module/Module";

//https://mocki.io/v1/8e6b0a33-33da-4443-9427-b886a1d2c1e9 - only platform
//https://mocki.io/v1/7c08f1ab-78e3-40a0-ad30-4f8c9b821b88 - platform and module-a

export enum EModuleNames {
  platform = "platform",
  moduleA = "module-a",
  moduleB = "module-b",
  moduleC = "module-c",
}

const run = async () => {
  importAll(require.context("../../", true, /index.modules\.tsx?$/));

  Expander.instance.build([EModuleNames.platform]);
};

run();
