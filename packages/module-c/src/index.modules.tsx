import { EModuleNames } from "@saneksa/core/src/const";
import {
  Expander,
  Module,
  type IModule,
  TModuleParams,
} from "@saneksa/core/src/index";

 class ModuleC extends Module implements IModule {}

const moduleCInstance = new ModuleC({
  name: EModuleNames.moduleC,
  routesGetters: () => [
    {
      key: "module-c-1",
      path: "module-c-1",
    },
    {
      key: "module-c-2",
      path: "module-c-2",
    },
  ],
  errorsGetters: () => [
    {
      code: "module-c-code-1",
      message: "module-c-message-1",
    },
  ],
});

Expander.instance.expandModules(moduleCInstance);

export {};
