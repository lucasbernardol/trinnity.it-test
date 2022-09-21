import 'express';

/**
 * @TODO
 *  Add stackoverflow reference.
 */

interface Locals {
  [key: string]: any;
  headers?: Record<string, any>;
  data: any;
  attempt?: {
    status: number;
  };
}

declare module 'express' {
  export interface Response {
    locals: Locals;
  }
}
