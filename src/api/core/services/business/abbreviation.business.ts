//import { Not, IsNull } from 'typeorm'

import { Abbreviation } from '../../entities/abbreviation.entity';

// prettier-ignore
import { 
  AbbreviationRepositoryFactory 
} from '../../factories/abbreviation-repository.factory';

/**
 * @class AbbreviationBusiness
 */
class AbbreviationBusiness {
  /**
   * @private constructor
   */
  public constructor(
    private readonly repository = AbbreviationRepositoryFactory.repository()
  ) {}

  async all(): Promise<{ abbreviations: Partial<Abbreviation[]> }> {
    const abbreviations = await this.repository.find();

    return { abbreviations };
  }
}

export { AbbreviationBusiness };
