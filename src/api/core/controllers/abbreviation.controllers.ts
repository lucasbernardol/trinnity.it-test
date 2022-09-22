import { Request, Response, NextFunction } from 'express';

// prettier-ignore
import { 
  AbbreviationRepositoryFactory 
} from '../factories/abbreviation-repository.factory';

class AbbreviationController {
  async all(request: Request, response: Response) {
    const abbreviationRepository = AbbreviationRepositoryFactory.repository();

    const abbreviations = await abbreviationRepository.find();

    return response.json({ data: abbreviations });
  }
}

export { AbbreviationController };
