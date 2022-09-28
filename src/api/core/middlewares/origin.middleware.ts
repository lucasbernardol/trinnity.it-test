import { Request, Response, NextFunction } from 'express';
import { NotAcceptable } from 'http-errors';

import { CONTENT_TYPES } from '../types/enums/content-type.enum';

const APP_CONTENT_TYPE = 'application/json';

const HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': [
    'Content-Type',
    'Authorization',
    'Origin',
    'pragma',
  ],
  'Access-Control-Allow-Methods': '*',
};

/**
 * @class OriginMiddleware
 */
class OriginMiddleware {
  private static instance: OriginMiddleware;

  static get() {
    if (!this.instance) {
      this.instance = new OriginMiddleware();
    }

    return this.instance;
  }

  /**
   *
   * @returns
   */
  public use() {
    return (request: Request, response: Response, next: NextFunction) => {
      const _METHOD = request.method;

      console.log({ path: request.path });

      if (_METHOD === 'OPTIONS') {
        return response.writeHead(200, HEADERS).end();
      }

      const givenContentTypeHeader = request.get('content-type');

      const givenOriginHeader = request.get('origin');

      if (!givenContentTypeHeader) {
        return next(
          new NotAcceptable(
            'Content-Type must be "application/json" or "multipart/form-data".'
          )
        );
      }

      /**
       * Allow: "application/json" and "multipart/form-data".
       */
      const _CONTENT_TYPE: string = CONTENT_TYPES[APP_CONTENT_TYPE];

      const _CONTENT_MULTIPART: string = CONTENT_TYPES['multipart/form-data'];

      // prettier-ignore
      if (
        _CONTENT_TYPE !== givenContentTypeHeader
          &&
        _CONTENT_MULTIPART.lastIndexOf(givenContentTypeHeader) === -1 /** !== */
      ) {
        return next(
          new NotAcceptable(
            'Content-Type must be "application/json" or "multipart/form-data".'
          )
        )
      }

      if (!givenOriginHeader) {
        return next(new NotAcceptable(`Origin header not especified.`));
      }

      return next();
    };
  }
}
export const Origin = OriginMiddleware.get();
