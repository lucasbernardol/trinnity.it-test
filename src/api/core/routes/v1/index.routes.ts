import { Router } from 'express';
import { AbbreviationController } from '../../controllers/abbreviation.controllers';

const routes = Router();

const controller = new AbbreviationController();

routes.get('/api/v1/abbreviations', controller.all);
routes.get('/api/v1/abbreviations/:id', controller.findById);

routes.post('/api/v1/abbreviations', controller.create);

routes.patch('/api/v1/abbreviations/:id/trash', controller.trashById);
routes.patch('/api/v1/abbreviations/:id/restore', controller.trashRestoreById);

routes.delete('/api/v1/abbreviations/:id', controller.delete);

export { routes };
