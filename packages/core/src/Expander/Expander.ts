import { action, computed, makeObservable, observable } from "mobx";
import type { Module } from "..";

type TPrivateFields = "_modules" | "_routes" | "expandRoutes";

class Expander {
  public static instance: Expander;

  private _modules = new Map<string, Module>();

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
      expandModules: action.bound,
      expandRoutes: action.bound,
      modules: computed,
    });
  }

  //-----------------------COMPUTED--------------------------------------
  public get modules() {
    return Array.from(this._modules.values());
  }
  public get routes() {
    return this._routes;
  }

  // -----------------------ACTIONS-------------------------------------
  public expandModules(module: Module) {
    this._modules.set(module.name, module);
  }

  private expandRoutes(routes: any[]) {
    this._routes.push(routes);
  }

  //---------------------HELPERS------------------------------

  public build(moduleNames: string[]) {
    moduleNames.forEach((name) => {
      const module = this._modules.get(name);

      if (module) {
        this.expandRoutes(module.getRoutesGetters()());
      }
    });

    moduleNames.forEach((name) => {
      const module = this._modules.get(name);

      if (module) {
        module.getEntrypointGetters()();
      }
    });
  }
}

export { Expander };
