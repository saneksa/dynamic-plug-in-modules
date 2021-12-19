import {
  EModuleNames,
  Expander,
  Module,
  type IModule,
} from "@saneksa/core/src/index";
import { getPlatformEntrypoint } from ".";

class PlatformModule extends Module implements IModule {}

const platformModuleInstance = new PlatformModule({
  name: EModuleNames.platform,
  routesGetters: () => [
    {
      key: "platform-1",
      path: "platform-1",
    },
    {
      key: "platform-2",
      path: "platform-2",
    },
  ],
  errorsGetters: () => [
    {
      code: "platform-code-1",
      message: "platform-message-1",
    },
  ],

  entrypointGetters: getPlatformEntrypoint,
});

Expander.instance.expandModules(platformModuleInstance);

export {};
