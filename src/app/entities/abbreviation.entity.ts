import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  VersionColumn,
  Index,
} from 'typeorm';

import { Exclude, Transform } from 'class-transformer';

import { targetTransformerCallback } from './abbreviation.transforms';

// prettier-ignore
type AbbreviationRecordFields = Record<keyof Abbreviation,string | number | Date>;

export type AbbreviationWhitelistRecordKeys = Omit<
  AbbreviationRecordFields,
  'deleted_at'
>;

export type AbbreviationBlackListRecordKeys = Pick<
  AbbreviationRecordFields,
  'deleted_at'
>;

type AbbreviationWhitelistKeys = Array<keyof AbbreviationWhitelistRecordKeys>;

type AbbreviationBlacklistKeys = Array<keyof AbbreviationBlackListRecordKeys>;

@Entity({ name: 'abbreviations' })
class Abbreviation {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    length: 2048,
    nullable: true,
  })
  @Transform((params) => targetTransformerCallback(params))
  target_url!: string;

  @Column({ length: 2048 })
  @Index({ unique: true })
  original_url!: string;

  @Column()
  @Index({ unique: true })
  hash!: string;

  @Column({
    default: 0,
  })
  hits!: number;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @DeleteDateColumn({
    select: false,
    default: null,
  })
  @Exclude({ toPlainOnly: true })
  deleted_at!: Date;

  // bigitnt
  @VersionColumn({
    name: '_version',
    default: 1,
    select: true,
  })
  __v!: number;

  /**
   * @description Returns an Array that contains all fields/public keys.
   * @returns {Array} All public keys
   */
  static whitelist(): AbbreviationWhitelistKeys {
    return [
      'id',
      'target_url',
      'original_url',
      'hash',
      'hits',
      'created_at',
      'updated_at',
      '__v',
    ];
  }

  /**
   * @description All `blacklisted` keys.
   */
  static blacklist(): AbbreviationBlacklistKeys {
    // prettier-ignore
    return [
      'deleted_at'
    ];
  }
}

export { Abbreviation, AbbreviationWhitelistKeys };
