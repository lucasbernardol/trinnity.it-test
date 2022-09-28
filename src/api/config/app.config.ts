import {
  json as Json,
  urlencoded as URLEncoded,
  Application as ExpressApplicaion,
} from 'express';

import compression from 'compression';
import cors from 'cors';

import helmet from 'helmet';
import hpp from 'hpp';

import { ExpressFactory } from '../core/factories/express.factory';
import { MorganConfiguration } from './morgan.config';
import { routes } from '../core/routes/v1/index.routes';

import { Origin } from '../core/middlewares/origin.middleware';
import { CatchMiddleware } from '../core/middlewares/catch.middleware';
import { RouterProxy } from '../core/services/router-proxy.service';

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

    this.application.use(Origin.use());

    this.application.use(cors());

    this.application.use(helmet());

    /**
     * - Parameter pollution
     */
    this.application.use(hpp({ checkBody: false }));

    this.application.use(MorganConfiguration.use());

    this.application.use('/api/v1', new RouterProxy().load().router);

    this.application.use(CatchMiddleware.use());

    return this;
  }
}

const Application = new ApplicationConfiguration().init().load().application;

export { Application, ApplicationConfiguration as Context };
