"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class all1573174754299 {
    constructor() {
        this.name = 'all1573174754299';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "editions" DROP CONSTRAINT "FK_7836659a54206515842fcb9de32"`, undefined);
            yield queryRunner.query(`ALTER TABLE "keyboards" ALTER COLUMN "id" SET DEFAULT 'kb_f5xnh4yxk2pfmr6t'`, undefined);
            yield queryRunner.query(`ALTER TABLE "keyboards" ALTER COLUMN "shortId" SET DEFAULT 'kOhoUUBB'`, undefined);
            yield queryRunner.query(`ALTER TABLE "editions" ALTER COLUMN "id" SET DEFAULT 'ed_f5xnh4yxk2pfmr6u'`, undefined);
            yield queryRunner.query(`ALTER TABLE "editions" ALTER COLUMN "shortId" SET DEFAULT 'AnqI8DXNQ'`, undefined);
            yield queryRunner.query(`ALTER TABLE "editions" ADD CONSTRAINT "FK_7836659a54206515842fcb9de32" FOREIGN KEY ("keyboardId") REFERENCES "keyboards"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "editions" DROP CONSTRAINT "FK_7836659a54206515842fcb9de32"`, undefined);
            yield queryRunner.query(`ALTER TABLE "editions" ALTER COLUMN "shortId" SET DEFAULT 'E0Fu81ir'`, undefined);
            yield queryRunner.query(`ALTER TABLE "editions" ALTER COLUMN "id" SET DEFAULT 'ed_f5xnh4w2k2pfflh7'`, undefined);
            yield queryRunner.query(`ALTER TABLE "keyboards" ALTER COLUMN "shortId" SET DEFAULT 'u9zW0lqSQ'`, undefined);
            yield queryRunner.query(`ALTER TABLE "keyboards" ALTER COLUMN "id" SET DEFAULT 'kb_f5xnh4w2k2pfflh8'`, undefined);
            yield queryRunner.query(`ALTER TABLE "editions" ADD CONSTRAINT "FK_7836659a54206515842fcb9de32" FOREIGN KEY ("keyboardId") REFERENCES "keyboards"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        });
    }
}
exports.all1573174754299 = all1573174754299;
//# sourceMappingURL=1573174754299-all.js.map