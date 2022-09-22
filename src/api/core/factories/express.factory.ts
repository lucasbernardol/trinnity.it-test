import express, { Application } from 'express';


class ExpressFactory {
  /**
   * @description `Express.js` apllication/instance.
   */
  static create(): Application {
    return express();
  }
}

export { ExpressFactory };
