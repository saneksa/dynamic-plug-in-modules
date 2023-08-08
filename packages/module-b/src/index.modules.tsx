import { EModuleNames } from "@saneksa/core/src/const";
import {
  Expander,
  Module,
  type IModule,
  TModuleParams,
} from "@saneksa/core/src/index";

 class ModuleB extends Module implements IModule {}

const moduleBInstance = new ModuleB({
  name: EModuleNames.moduleB,
  routesGetters: () => [
    {
      key: "module-b-1",
      path: "module-b-1",
    },
    {
      key: "module-b-2",
      path: "module-b-2",
    },
  ],
  errorsGetters: () => [
    {
      code: "module-b-code-1",
      message: "module-b-message-1",
    },
  ],
});

Expander.instance.expandModules(moduleBInstance);

export {};
