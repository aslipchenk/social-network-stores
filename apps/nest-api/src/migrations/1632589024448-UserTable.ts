import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserTable1632589024448 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ADD COLUMN "registrationDate" DATE DEFAULT '${new Date().toISOString()}';`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN registrationDate;`);
  }
}
