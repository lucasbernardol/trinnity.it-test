import { AbbreviationController } from '../../controllers/abbreviation.controllers';
import { Router } from '../../types/class/router.class';

const abbreviationController = new AbbreviationController();

/**
 * @class AbbreviationRouter
 */
class AbbreviationRouter extends Router {
  public constructor() {
    super();
  }

  public define(): void {
    /**
     * - Path: "/api/v1/abbreviations"
     */
    this.routes
      .route('/')
      .get(abbreviationController.all)
      .post(abbreviationController.create);

    /**
     * - Path: "/api/v1/abbreviations/:id"
     */
    this.routes
      .route('/:id')
      .get(abbreviationController.findById)
      .delete(abbreviationController.delete);

    this.routes.route('/:id/trash').patch(abbreviationController.trashById);

    this.routes
      .route('/:id/restore')
      .patch(abbreviationController.trashRestoreById);
  }
}

export { AbbreviationRouter };
