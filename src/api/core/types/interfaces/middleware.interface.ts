import { NextFunction, Request, Response } from 'express';

export interface ErrorMiddlewareImplementation {
  use(
    error: any,
    request: Request,
    response: Response,
    next?: NextFunction
  ): void;
}
