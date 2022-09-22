import { EntityRepository, Repository } from 'typeorm';

import { Abbreviation } from '../entities/abbreviation.entity';

@EntityRepository(Abbreviation)
class AbbreviationRepository extends Repository<Abbreviation> {}

export { AbbreviationRepository };
