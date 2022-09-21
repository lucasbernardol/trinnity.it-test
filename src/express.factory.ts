import express, { Application } from 'express';

export class ExpressFactory {
  /**
   * - `Express.js` application instance.
   * @returns Application
   */
  static create(): Application {
    return express();
  }
}
