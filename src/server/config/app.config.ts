import {
  json as Json,
  urlencoded as URLEncoded,
  Application as ExpressApplicaion,
} from 'express';

import compression from 'compression';
import cors from 'cors';

import helmet from 'helmet';
import hpp from 'hpp';

import morgan from 'morgan';

import { ExpressFactory } from '../core/factories/express.factory';
/**
 * - `Express.js` config/application.
 * @class Application
 */
class ApplicationConfiguration {
  private static _instance: ApplicationConfiguration;

  public application!: ExpressApplicaion;

  /**
   * @public
   */
  public constructor() {}

  public init(): ApplicationConfiguration {
    if (!this.application) {
      this.application = ExpressFactory.create();
    }

    return this;
  }

  public load(): ApplicationConfiguration {
    this.application.use(compression());
    // Add `compression` middleware.
    this.application.use(Json());
    this.application.use(URLEncoded({ extended: false }));

    this.application.use(cors());

    this.application.use(helmet());

    /**
     * - Parameter pollution
     */
    this.application.use(hpp({ checkBody: false }));

    this.application.use(morgan('dev'));

    return this;
  }
}

const Application = new ApplicationConfiguration().init().load().application;

export { Application, ApplicationConfiguration as Context };
