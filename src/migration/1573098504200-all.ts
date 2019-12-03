import {MigrationInterface, QueryRunner} from "typeorm";

export class all1573098504200 implements MigrationInterface {
    name = 'all1573098504200'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "edition" ALTER COLUMN "shortId" SET DEFAULT 'B5LFG4q2'`, undefined);
        await queryRunner.query(`ALTER TABLE "keyboards" ALTER COLUMN "id" SET DEFAULT 'kb_f5xnh1xsk2o68g21'`, undefined);
        await queryRunner.query(`ALTER TABLE "keyboards" ALTER COLUMN "shortId" SET DEFAULT 'NmxdzyDhK'`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "keyboards" ALTER COLUMN "shortId" SET DEFAULT 'NFx-3BQo'`, undefined);
        await queryRunner.query(`ALTER TABLE "keyboards" ALTER COLUMN "id" SET DEFAULT 'kb_f5xnh1tvk2o64kc9'`, undefined);
        await queryRunner.query(`ALTER TABLE "edition" ALTER COLUMN "shortId" SET DEFAULT 'XxBfsIjl4'`, undefined);
    }

}
