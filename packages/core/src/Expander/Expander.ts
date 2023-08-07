import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from "mobx";
import type { Module } from "..";
import { EModuleNames } from "@saneksa/core/src/const";

type TPrivateFields =
  | "_modules"
  | "_routes"
  | "_connectedModules"
  | "expandRoutes"
  | "clear";

class Expander {
  public static instance: Expander;

  static {
    if (!this.instance) {
      this.instance = new Expander();
    }
  }

  private _modules = new Map<EModuleNames, Module>();
  private _connectedModules = new Set<Module>();
  private _routes: any[] = [];

  private constructor() {
    makeObservable<this, TPrivateFields>(this, {
      _modules: observable,
      _routes: observable,
      _connectedModules: observable,
      expandModules: action.bound,
      expandRoutes: action.bound,
      connectModules: action.bound,
      disconnectModules: action.bound,
      destroy: action.bound,
      clear: action.bound,
      modules: computed,
      connectedModules: computed,
      connectedModuleNames: computed,
    });
  }

  //-----------------------COMPUTED--------------------------------------
  public get modules() {
    return Array.from(this._modules.values());
  }

  public get routes() {
    return this._routes;
  }

  public get connectedModules() {
    return Array.from(this._connectedModules.values());
  }

  public get connectedModuleNames() {
    const names = new Set<EModuleNames>();

    this._connectedModules.forEach((m) => names.add(m.name));

    return names;
  }

  // -----------------------ACTIONS-------------------------------------
  public expandModules(module: Module) {
    this._modules.set(module.name, module);
  }

  private expandRoutes(routes: any[] | null) {
    if (routes) {
      this._routes.push(routes);
    }
  }

  public connectModules(moduleNames: EModuleNames[]) {
    this.build([...this.connectedModules.map((m) => m.name), ...moduleNames]);

    return this;
  }

  public disconnectModules(moduleNames: EModuleNames[]) {
    const moduleNamesSet = new Set(moduleNames);

    const connectModuleNames = this.connectedModules
      .filter((m) => !moduleNamesSet.has(m.name))
      .map((m) => m.name);

    this.build(connectModuleNames);

    return this;
  }

  private clear() {
    this._connectedModules.forEach((module) => {
      if (module) {
        module.getEntrypointGetters()?.()?.unmount?.();
      }
    });

    this._connectedModules.clear();
    this._routes = [];
  }

  public destroy() {
    this.clear();
  }

  //---------------------HELPERS------------------------------

  public build(moduleNames: EModuleNames[]) {
    this.clear();

    moduleNames.forEach((name) => {
      const module = this._modules.get(name);

      if (module) {
        runInAction(() => {
          this._connectedModules.add(module);
        });

        this.expandRoutes(module.getRoutesGetters()?.() ?? null);
      }
    });

    moduleNames.forEach((name) => {
      const module = this._modules.get(name);

      if (module) {
        module.getEntrypointGetters()?.()?.mount?.();
      }
    });
  }
}

export { Expander };
