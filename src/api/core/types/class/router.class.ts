import { Router as ExpressRouter } from 'express';

export abstract class Router {
  public routes!: ExpressRouter;

  public constructor() {
    if (!this.routes) {
      this.routes = ExpressRouter();
    }

    this.define();
  }

  abstract define(): void;
}
