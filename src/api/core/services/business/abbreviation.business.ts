import { IsNull, Not } from 'typeorm';

import { Abbreviation } from '../../entities/abbreviation.entity';
import { AbbreviationRepository } from '../../repositories/abbreviation.reposiotry';
import { NanoIDFactory } from '../../factories/nanoid.factory';

// prettier-ignore
import { 
  AbbreviationRepositoryFactory 
} from '../../factories/abbreviation-repository.factory';

type FindByIdOptions = {
  id: string | number;
};

type TrashOptions = {} & FindByIdOptions;

type AbbreviationInsertOptions = {
  original_url: string;
};

/**
 * @class AbbreviationBusiness
 */
export class AbbreviationBusiness {
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

  async findById({
    id,
  }: FindByIdOptions): Promise<{ abbreviation: Abbreviation | undefined }> {
    const abbreviationPlain = await this.repository.findOne({
      where: {
        id,
      },
    });

    const abbreviation = (abbreviationPlain ?? null) as any;

    return { abbreviation };
  }

  async insert(
    abbreviationParams: AbbreviationInsertOptions
  ): Promise<{ abbreviation: Partial<Abbreviation> }> {
    const { original_url } = abbreviationParams;

    // `NanoId.js` hash.
    const hash: string = NanoIDFactory.id();

    const abbreviationInstance = this.repository.create({ original_url, hash });

    const abbreviation = await this.repository.save(abbreviationInstance);

    return { abbreviation };
  }

  async insertTrashById({ id }: TrashOptions) {
    /**
     * - QUERY;
     *  ...WHERE
     *      abbraviation.deleted_at IS NULL
     *        AND
     *      abbreviation.id = "%1";
     */
    const abbreviationTransactionResult = await this.repository.softDelete({
      id: id as any,

      deleted_at: IsNull(),
    });

    return { trashed: !!abbreviationTransactionResult?.affected };
  }

  async restoreTrashById({ id }: TrashOptions) {
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
    const abbreviationTransaction = await this.repository.restore({
      id: id as any,

      deleted_at: Not(IsNull()),
    });

    return { restored: !!abbreviationTransaction?.affected };
  }

  async delete({ id }: TrashOptions) {
    const abbreviationTransaction = await this.repository.delete({
      id: id as any,
      deleted_at: Not(IsNull()),
    });

    return { deleted: !!abbreviationTransaction?.affected };
  }
}

export function from(reposiotry?: AbbreviationRepository) {
  return new AbbreviationBusiness(reposiotry);
}
