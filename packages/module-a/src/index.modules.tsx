import { Expander, Module, type IModule } from "@saneksa/core/src/index";

class ModuleA extends Module implements IModule {}

const moduleAInstance = new ModuleA({
  name: "module-a",
  routesGetters: () => [
    {
      key: "module-a-1",
      path: "module-a-1",
    },
    {
      key: "module-a-2",
      path: "module-a-2",
    },
  ],
  errorsGetters: () => [
    {
      code: "module-a-code-1",
      message: "module-a-message-1",
    },
  ],
});

Expander.instance.expandModules(moduleAInstance);

export {};
