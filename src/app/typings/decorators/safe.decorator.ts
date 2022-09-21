import { Request, Response, NextFunction } from 'express';

// `Express.js` @Safe decorator.

type SafeOptions = {
  isAttached?: boolean;
};

export type MethodExecutionConfig = {
  headers?: Record<string, any>;
  data: any;
  atempt?: {
    status: number;
  };
};

const METHOD_EXECUTION_CONFIG: Partial<MethodExecutionConfig> = {
  headers: {},
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
    const _method = target[_proportyKey];

    async function _run<T>(
      context: any,
      args: T[]
    ): Promise<MethodExecutionConfig> {
      const _self = context; // scoped

      const response: MethodExecutionConfig = await _method.apply(_self, args);

      const { headers, data, atempt } = parser<MethodExecutionConfig>(
        METHOD_EXECUTION_CONFIG,
        response
      );

      return { headers, data, atempt };
    }

    // base
    async function _(context: any, args: any[]) {
      const { headers, atempt, data } = await _run(context, args);

      // `Express.js` response object.
      const _response = args[1] as Response;

      const statusCode = atempt?.status || 200;

      /**
       * - Add `statusCode` and request `headers`.
       */
      _response.status(statusCode);
      _response.set(headers as any);

      // Attach response.locals value.
      if (isAttached) {
        return (_response.locals.data = data) as any;
      } else {
        return null;
      }
    }

    target[_proportyKey] = function (...args: any[]): void {
      /**
       * @Equal
       *   "args": [request, response, next];
       */
      //const { files } = args[0] as { files: any[] };

      // `Express.js` next function.
      const _next = args[2] as NextFunction;

      const next = (e?: Error): void => {
        return e ? _next(e) : _next();
      };

      return _(this, args)
        .then(() => next())
        .catch((e) => next(e)) as any;
    };

    return target[_proportyKey];
  };
}
