import { Response, NextFunction } from 'express';

const _DEFUALT_HTTP_STATUS_CODE: number = 200;

/**
 *  - `Express.js` @Safe decorator.
 * @see https://expressjs.com
 */

type SafeOptions = {
  isAttached?: boolean;
};

export type SafeExecutionConfig = {
  _meta?: any;
  headers?: Record<string, any>;
  data?: any;
  atempt?: {
    status: number;
  };
};

const METHOD_EXECUTION_CONFIG: Partial<SafeExecutionConfig> = {
  headers: {},
  _meta: null,
  data: null,
  atempt: {
    status: 200,
  },
};

function parser<T = any>(to: Partial<T>, at: Partial<T>): T {
  return Object.assign({}, to, at) as T;
}

/**
 * - Safe `Express.js` routing decorator. Catch all routes.
 * @decorator
 */
export function Safe({ isAttached }: SafeOptions = { isAttached: true }) {
  // Decorator closure
  return (target: any, _proportyKey: string, descriptor: Record<any, any>) => {
    const _method = target[_proportyKey] as (
      ...args: any[]
    ) => Promise<SafeExecutionConfig>;

    async function _methodExecution<T>(
      context: any,
      args: T[]
    ): Promise<SafeExecutionConfig> {
      const _self = context; // scoped

      const response = await _method.apply(_self, args);

      let { headers, data, atempt, _meta } = parser<SafeExecutionConfig>(
        METHOD_EXECUTION_CONFIG,
        response
      );

      return {
        data: _meta ? { data, _meta } : data,
        headers,
        atempt,
      };
    }

    // base
    async function safeRequest(context: any, args: any[]): Promise<void> {
      const { headers, atempt, data } = await _methodExecution(context, args);

      // `Express.js` response object.
      const _response = args[1] as Response;

      const statusCode = atempt?.status || _DEFUALT_HTTP_STATUS_CODE;

      /**
       * - Add `statusCode` and request `headers`.
       */
      _response.status(statusCode);
      _response.set(headers as any);

      // Attach response.locals value.
      if (isAttached) {
        return (_response.locals.data = data);
      }
    }

    target[_proportyKey] = function (...args: any[]): void {
      /**
       * @Equal
       *   "args": [request, response, next];
       */
      //const { files } = args[0] as { files: any[] };

      // `Express.js` next function.
      const _nextFunction = args[2] as NextFunction;

      const next = (e?: Error): void => {
        return e ? _nextFunction(e) : _nextFunction();
      };

      return safeRequest(this, args)
        .then(() => next())
        .catch((error) => next(error)) as any;
    };

    return target[_proportyKey];
  };
}
