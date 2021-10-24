import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserTable1632657838265 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ADD COLUMN status VARCHAR DEFAULT 'created' CHECK (status IN ('created', 'active', 'deleted'));`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "isActive";`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN status;`);
  }
}
