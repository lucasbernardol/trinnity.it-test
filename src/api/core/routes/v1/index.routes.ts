import { Router, RequestHandler } from 'express';
import { AbbreviationController } from '../../controllers/abbreviation.controllers';

const routes = Router();

const controller = new AbbreviationController();

routes.get('/api/v1/abbreviations', controller.all);

export { routes };
