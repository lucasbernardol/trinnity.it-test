import { Request, Response, NextFunction } from 'express';
import { isHttpError } from 'http-errors';

import { ErrorMiddlewareImplementation } from '../types/interfaces/middleware.interface';

/**
 * @class Catch
 */
class Catch implements ErrorMiddlewareImplementation {
  private static instance: Catch;

  static get(): Catch {
    const catchInstanceNotExits = !this.instance;

    if (catchInstanceNotExits) {
      this.instance = new Catch();
    }

    return this.instance;
  }

  private constructor() {}

  public use() {
    return (
      error: Error,
      _: Request,
      response: Response,
      next: NextFunction
    ) => {
      const isHttpErrorParams = isHttpError(error);

      if (isHttpErrorParams) {
        const { name, message, statusCode } = error;

        return response.status(statusCode).json({ name, message, statusCode });
      } else {
        return response.status(500).json({ name: error.name });
      }
    };
  }
}

export const CatchMiddleware = Catch.get();
