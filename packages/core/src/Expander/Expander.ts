import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from "mobx";
import type { Module } from "..";

type TPrivateFields =
  | "_modules"
  | "_routes"
  | "_connectedModules"
  | "expandRoutes"
  | "clear";

class Expander {
  public static instance: Expander;

  private _modules = new Map<string, Module>();
  private _connectedModules = new Set<Module>();

  private _routes: any[] = [];

  static {
    if (!this.instance) {
      this.instance = new Expander();
    }
  }

  constructor() {
    makeObservable<this, TPrivateFields>(this, {
      _modules: observable,
      _routes: observable,
      _connectedModules: observable,
      expandModules: action.bound,
      expandRoutes: action.bound,
      connectModules: action.bound,
      disableModules: action.bound,
      clear: action.bound,
      modules: computed,
      connectedModules: computed,
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

  // -----------------------ACTIONS-------------------------------------
  public expandModules(module: Module) {
    this._modules.set(module.name, module);
  }

  private expandRoutes(routes: any[] | null) {
    if (routes) {
      this._routes.push(routes);
    }
  }

  public connectModules(moduleNames: string[]) {
    this.build([...this.connectedModules.map((m) => m.name), ...moduleNames]);
  }

  public disableModules(moduleNames: string[]) {
    const moduleNamesSet = new Set(moduleNames);

    const connectModuleNames = this.connectedModules
      .filter((m) => !moduleNamesSet.has(m.name))
      .map((m) => m.name);

    this.build(connectModuleNames);
  }

  private clear() {
    this._connectedModules.clear();
    this._routes = [];
  }

  //---------------------HELPERS------------------------------

  public build(moduleNames: string[]) {
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
        module.getEntrypointGetters()?.();
      }
    });
  }
}

export { Expander };
