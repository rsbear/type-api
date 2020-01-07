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
class all1573098504200 {
    constructor() {
        this.name = 'all1573098504200';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "edition" ALTER COLUMN "shortId" SET DEFAULT 'B5LFG4q2'`, undefined);
            yield queryRunner.query(`ALTER TABLE "keyboards" ALTER COLUMN "id" SET DEFAULT 'kb_f5xnh1xsk2o68g21'`, undefined);
            yield queryRunner.query(`ALTER TABLE "keyboards" ALTER COLUMN "shortId" SET DEFAULT 'NmxdzyDhK'`, undefined);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "keyboards" ALTER COLUMN "shortId" SET DEFAULT 'NFx-3BQo'`, undefined);
            yield queryRunner.query(`ALTER TABLE "keyboards" ALTER COLUMN "id" SET DEFAULT 'kb_f5xnh1tvk2o64kc9'`, undefined);
            yield queryRunner.query(`ALTER TABLE "edition" ALTER COLUMN "shortId" SET DEFAULT 'XxBfsIjl4'`, undefined);
        });
    }
}
exports.all1573098504200 = all1573098504200;
//# sourceMappingURL=1573098504200-all.js.map