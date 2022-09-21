import { Request, Response, NextFunction } from 'express';

/**
 * @class Resolve
 */
class Resolve {
  private static _instance: Resolve;

  static get(): Resolve {
    const resolveInstanceNotAvailable = !this._instance;

    if (resolveInstanceNotAvailable) {
      this._instance = new Resolve();
    }

    return this._instance;
  }

  private constructor() {}

  /**
   * @public use
   */
  async use(_: Request, response: Response, next: NextFunction) {
    const { data } = response.locals as { data: any }; // clean

    console.log(response.statusCode);

    return response.json(data);
  }
}

export const ResolveMiddleware = Resolve.get();
