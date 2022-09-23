import type { AbbreviationRepository } from '../repositories/abbreviation.reposiotry';

import { from } from '../services/business/abbreviation.business';

class AbbrebiationBusinessFactory {
  static business(reposiotry?: AbbreviationRepository) {
    /**
     * - Create a `business` instance.
     */
    return from(reposiotry);
  }
}

export { AbbrebiationBusinessFactory };
