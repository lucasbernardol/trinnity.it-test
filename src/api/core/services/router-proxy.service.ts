import { Router } from 'express';

import { AbbreviationRouter } from '../routes/v1/abbreviations.routes';

class RouterProxy {
  public router: Router = Router();

  private readonly prodivers = [
    {
      path: '/abbreviations/',
      Router: AbbreviationRouter,
    },
  ];

  public load() {
    const routerProviders = this.prodivers;

    for (const provider of routerProviders) {
      const { path, Router } = provider;

      this.router.use(path, new Router().routes);
    }

    return this;
  }
}

export { RouterProxy };
