import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  VersionColumn,
} from 'typeorm';

interface EntityContract {
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
  __v: number; // bigint
}

/*
 - Database "abbreviations" table representation.
*/
@Entity({
  name: 'abbreviations',
})
export class Abbreviation implements EntityContract {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  target_url!: number;

  @Column()
  original_url!: number;

  @Column()
  hash!: string;

  @Column()
  hits!: number;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @DeleteDateColumn()
  deleted_at!: Date;

  @VersionColumn({
    name: '_version',
    default: 1,
  })
  __v!: number;
}
