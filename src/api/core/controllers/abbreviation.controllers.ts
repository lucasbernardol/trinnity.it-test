import { Request, Response, NextFunction } from 'express';

// prettier-ignore
import { 
  AbbrebiationBusinessFactory 
} from '../factories/abbreviation-business.factory';

/**
 * @class AbbreviationController
 */
class AbbreviationController {
  async all(request: Request, response: Response, next: NextFunction) {
    try {
      const abbreviationBusiness = AbbrebiationBusinessFactory.business();

      const { abbreviations } = await abbreviationBusiness.all();

      return response.json({ abbreviations });
    } catch (error) {
      return next(error);
    }
  }

  async findById(request: Request, response: Response, next: NextFunction) {
    try {
      const { id } = request.params as { id: string };

      const abbreviationBusiness = AbbrebiationBusinessFactory.business();

      const { abbreviation } = await abbreviationBusiness.findById({ id });

      return response.json(abbreviation);
    } catch (error) {
      return next(error);
    }
  }

  async create(request: Request, response: Response, next: NextFunction) {
    try {
      const { original_url } = request.body as { original_url: string };

      const abbreviationBusiness = AbbrebiationBusinessFactory.business();

      const { abbreviation } = await abbreviationBusiness.insert({
        original_url,
      });

      return response.status(201).json(abbreviation); // created
    } catch (error) {
      return next(error);
    }
  }

  /**
   * @description Add `abbreviation` to trash.
   */
  async trashById(request: Request, response: Response, next: NextFunction) {
    try {
      const { id } = request.params as unknown as { id: number };

      const abbreviationBusiness = AbbrebiationBusinessFactory.business();

      const { trashed } = await abbreviationBusiness.insertTrashById({ id });

      return response.json({ trashed });
    } catch (error) {
      return next(error);
    }
  }

  async trashRestoreById(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const { id } = request.params as unknown as { id: number };

      const abbreviationBusiness = AbbrebiationBusinessFactory.business();

      const { restored } = await abbreviationBusiness.restoreTrashById({ id });

      return response.json({ restored });
    } catch (error) {
      return next(error);
    }
  }

  async delete(request: Request, response: Response, next: NextFunction) {
    try {
      const { id } = request.params as unknown as { id: number };

      const abbreviationBusiness = AbbrebiationBusinessFactory.business();

      const { deleted } = await abbreviationBusiness.delete({ id });

      return response.status(200).json({ deleted });
    } catch (error) {
      return next(error);
    }
  }
}

export { AbbreviationController };
