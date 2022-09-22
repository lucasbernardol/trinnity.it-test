import { RequestHandler } from 'express';
import morgan from 'morgan';

/**
 * @class MorganLogger
 */
class MorganConfiguration {
  /**
   * @public
   */
  public constructor() {}

  static use(): RequestHandler {
    return morgan('dev');
  }
}

export { MorganConfiguration };
