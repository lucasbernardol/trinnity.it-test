import { getCustomRepository } from 'typeorm';

import { AbbreviationRepository } from '../repositories/abbreviation.reposiotry';

/**
 * @class AbbreviationRepositoryFactory
 */
class AbbreviationRepositoryFactory {
  static repository() {
    return getCustomRepository(AbbreviationRepository);
  }
}

export { AbbreviationRepositoryFactory };
