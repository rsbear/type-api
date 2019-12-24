"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const type_graphql_1 = require("type-graphql");
const uniqid_1 = __importDefault(require("uniqid"));
const User_1 = require("./User");
const dayjs_1 = __importDefault(require("dayjs"));
let Vote = class Vote extends typeorm_1.BaseEntity {
    constructor() {
        super(...arguments);
        this.id = uniqid_1.default("vote_");
        this.expiration = dayjs_1.default().add(2, 'minute').format();
    }
};
__decorate([
    type_graphql_1.Field(),
    typeorm_1.PrimaryColumn("varchar", { default: `${uniqid_1.default("vote_")}` }),
    __metadata("design:type", String)
], Vote.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column("text"),
    __metadata("design:type", String)
], Vote.prototype, "editionId", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], Vote.prototype, "created", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    typeorm_1.Column({ default: `${dayjs_1.default().add(2, 'minute')} ` }),
    __metadata("design:type", String)
], Vote.prototype, "expiration", void 0);
__decorate([
    type_graphql_1.Field(() => User_1.User, { nullable: true }),
    typeorm_1.ManyToOne(() => User_1.User, user => user.votes),
    typeorm_1.JoinColumn(),
    __metadata("design:type", User_1.User)
], Vote.prototype, "user", void 0);
Vote = __decorate([
    type_graphql_1.ObjectType(),
    typeorm_1.Entity("votes")
], Vote);
exports.Vote = Vote;
//# sourceMappingURL=Vote.js.map