import { Router } from 'express';

import { AbbreviationController } from './app/controllers/abbreviations.controllers';
import { version } from '../package.json';

import { ResolveMiddleware } from './app/middlewares/resolve.middleware';

const routes = Router();

const abbreviations = new AbbreviationController();

routes.get('/', (_, response) => response.json({ version }));

routes.get('/health', (_, response) => response.json({ status: 'UP' }));

/**
 * @Global
 * - Path: '/r'
 */
routes.get('/r/:hash', abbreviations.redirect);

routes.get('/api/v1/abbreviations', abbreviations.all, ResolveMiddleware.use);
routes.get(
  '/api/v1/abbreviations/:id',
  abbreviations.findById,
  ResolveMiddleware.use
);

routes.post(
  '/api/v1/abbreviations',
  abbreviations.create,
  ResolveMiddleware.use
);

/**
 * - SubRoutes
 */
routes.get(
  '/api/v1/trash/abbreviations',
  abbreviations.inTrash,
  ResolveMiddleware.use
);

routes.get('/api/v1/keys/abbreviations', abbreviations.keys);

export { routes };
