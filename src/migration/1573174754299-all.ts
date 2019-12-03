import {MigrationInterface, QueryRunner} from "typeorm";

export class all1573174754299 implements MigrationInterface {
    name = 'all1573174754299'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "editions" DROP CONSTRAINT "FK_7836659a54206515842fcb9de32"`, undefined);
        await queryRunner.query(`ALTER TABLE "keyboards" ALTER COLUMN "id" SET DEFAULT 'kb_f5xnh4yxk2pfmr6t'`, undefined);
        await queryRunner.query(`ALTER TABLE "keyboards" ALTER COLUMN "shortId" SET DEFAULT 'kOhoUUBB'`, undefined);
        await queryRunner.query(`ALTER TABLE "editions" ALTER COLUMN "id" SET DEFAULT 'ed_f5xnh4yxk2pfmr6u'`, undefined);
        await queryRunner.query(`ALTER TABLE "editions" ALTER COLUMN "shortId" SET DEFAULT 'AnqI8DXNQ'`, undefined);
        await queryRunner.query(`ALTER TABLE "editions" ADD CONSTRAINT "FK_7836659a54206515842fcb9de32" FOREIGN KEY ("keyboardId") REFERENCES "keyboards"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "editions" DROP CONSTRAINT "FK_7836659a54206515842fcb9de32"`, undefined);
        await queryRunner.query(`ALTER TABLE "editions" ALTER COLUMN "shortId" SET DEFAULT 'E0Fu81ir'`, undefined);
        await queryRunner.query(`ALTER TABLE "editions" ALTER COLUMN "id" SET DEFAULT 'ed_f5xnh4w2k2pfflh7'`, undefined);
        await queryRunner.query(`ALTER TABLE "keyboards" ALTER COLUMN "shortId" SET DEFAULT 'u9zW0lqSQ'`, undefined);
        await queryRunner.query(`ALTER TABLE "keyboards" ALTER COLUMN "id" SET DEFAULT 'kb_f5xnh4w2k2pfflh8'`, undefined);
        await queryRunner.query(`ALTER TABLE "editions" ADD CONSTRAINT "FK_7836659a54206515842fcb9de32" FOREIGN KEY ("keyboardId") REFERENCES "keyboards"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

}
