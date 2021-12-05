type TRoute = {
  key: string;
  path: string;
};

type TError = {
  code: string;
  message: string;
};

type TModuleParams = {
  name: string;
  routesGetters: () => TRoute[];
  errorsGetters: () => TError[];
  entrypointGetters: () => void;
};

interface IModule {
  getRoutesGetters(): () => TRoute[];
  getErrorsGetters(): () => TError[];
  getEntrypointGetters(): () => void;
}

abstract class Module implements IModule {
  #name: string;
  #routesGetters: () => TRoute[];
  #errorsGetters: () => TError[];
  #entrypointGetters: () => void;

  constructor(params: TModuleParams) {
    this.#name = params.name;
    this.#routesGetters = params.routesGetters;
    this.#errorsGetters = params.errorsGetters;
    this.#entrypointGetters = params.entrypointGetters;
  }

  public get name() {
    return this.#name;
  }

  public getRoutesGetters(): () => TRoute[] {
    return this.#routesGetters;
  }

  public getErrorsGetters(): () => TError[] {
    return this.#errorsGetters;
  }

  public getEntrypointGetters(): () => void {
    return this.#entrypointGetters;
  }
}

export { Module };
export type { IModule, TError, TRoute };
