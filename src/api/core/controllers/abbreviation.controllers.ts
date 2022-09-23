import { Request, Response, NextFunction } from 'express';
import { IsNull, Not } from 'typeorm';

// prettier-ignore
import { 
  AbbreviationRepositoryFactory 
} from '../factories/abbreviation-repository.factory';

import { NanoIDFactory } from '../factories/nanoid.factory';

// prettier-ignore
import { 
  AbbreviationBusiness,
} from '../services/business/abbreviation.business';

class AbbreviationController {
  async all(request: Request, response: Response) {
    const abbreviationBusiness = new AbbreviationBusiness();

    const { abbreviations } = await abbreviationBusiness.all();

    return response.json({ abbreviations });
  }

  async findById(request: Request, response: Response, next: NextFunction) {
    try {
      const { id } = request.params as { id: string };

      const abbreviationRepository = AbbreviationRepositoryFactory.repository();

      const abbreviation = await abbreviationRepository.findOne({
        where: {
          id,
        },
      });

      return response.json(abbreviation);
    } catch (error) {
      return next(error);
    }
  }

  async create(request: Request, response: Response, next: NextFunction) {
    try {
      const { original_url } = request.body as { original_url: string };

      const abbreviationRepository = AbbreviationRepositoryFactory.repository();

      const hash = NanoIDFactory.id();

      const abbreviationInstance = abbreviationRepository.create({
        original_url,
        hash,
      });

      const abbreviation = await abbreviationRepository.save(
        abbreviationInstance
      );

      return response.json(abbreviation);
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

      const abbreviationRepository = AbbreviationRepositoryFactory.repository();

      const abbreviation = await abbreviationRepository.softDelete({
        id,
        deleted_at: IsNull(),
      });

      //console.log(abbreviation);

      return response.sendStatus(204).end(); // No response.
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

      const abbreviationRepository = AbbreviationRepositoryFactory.repository();

      /**
       * QUERY:
       *  UPDATE
       *    abbreviations as abbreviation
       *  SET
       *    abbreviation.deleted_at = NULL,
       *    abbreviation.updated_at = CURRENT_TIMESTAMP,
       *    abbreviation._version = "abbreviation._version" + 1
       *  WHERE
       *    abbreviation.id = '$1'
       *      AND
       *    NOT("abbreviation.deleted_at" IS NULL);
       */
      const abbreviation = await abbreviationRepository.restore({
        id: id,
        deleted_at: Not(IsNull()),
      });

      process.stdout.write(JSON.stringify(abbreviation, null, 2));

      return response.sendStatus(204).end();
    } catch (error) {
      return next(error);
    }
  }

  async delete(request: Request, response: Response, next: NextFunction) {
    try {
      const { id } = request.params as unknown as { id: number };

      const abbreviationRepository = AbbreviationRepositoryFactory.repository();

      // Remove "abbreviation"
      const abbreviation = await abbreviationRepository.delete({
        id,
        deleted_at: Not(IsNull()),
      });

      const { affected } = abbreviation;

      return response.status(200).json({ deleted: !!affected });
    } catch (error) {
      return next(error);
    }
  }
}

export { AbbreviationController };
