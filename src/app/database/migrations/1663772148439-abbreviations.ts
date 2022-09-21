import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class abbreviations1663772148439 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'abbreviations',
        columns: [
          {
            name: 'id',
            type: 'int',
            isUnique: true,
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },

          {
            name: 'original_url',
            type: 'varchar',
            length: '2048',
            isUnique: true,
            isNullable: false,
          },

          {
            name: 'target_url',
            type: 'varchar',
            length: '2048',
            isUnique: true,
            isNullable: true,
            default: null,
          },

          {
            name: 'hash',
            type: 'varchar',
            length: '120',
            isUnique: true,
            isNullable: false,
          },

          {
            name: 'hits',
            type: 'int',
            default: 0,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },

          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },

          {
            name: 'deleted_at',
            type: 'timestamp',
            isNullable: true,
            default: null,
          },

          {
            name: '_version',
            type: 'bigint',
            isNullable: false,
            default: 1,
          },
        ],
      }),
      true
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('abbreviations');
  }
}
