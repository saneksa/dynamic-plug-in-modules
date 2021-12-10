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
  routesGetters?: () => TRoute[];
  errorsGetters?: () => TError[];
  entrypointGetters?: () => void;
};

interface IModule {
  getRoutesGetters(): (() => TRoute[]) | null;
  getErrorsGetters(): (() => TError[]) | null;
  getEntrypointGetters(): (() => void) | null;
}

abstract class Module implements IModule {
  #name: string;
  #routesGetters: (() => TRoute[]) | null;
  #errorsGetters: (() => TError[]) | null;
  #entrypointGetters: (() => void) | null;

  constructor(params: TModuleParams) {
    this.#name = params.name;
    this.#routesGetters = params.routesGetters ?? null;
    this.#errorsGetters = params.errorsGetters ?? null;
    this.#entrypointGetters = params.entrypointGetters ?? null;
  }

  public get name() {
    return this.#name;
  }

  public getRoutesGetters() {
    return this.#routesGetters;
  }

  public getErrorsGetters() {
    return this.#errorsGetters;
  }

  public getEntrypointGetters() {
    return this.#entrypointGetters;
  }
}

export { Module };
export type { IModule, TError, TRoute };
