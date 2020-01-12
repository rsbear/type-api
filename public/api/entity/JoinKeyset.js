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
const Keyset_1 = require("./Keyset");
let JoinKeyset = class JoinKeyset extends typeorm_1.BaseEntity {
    constructor() {
        super(...arguments);
        this.id = uniqid_1.default("join_");
    }
};
__decorate([
    type_graphql_1.Field(),
    typeorm_1.PrimaryColumn("varchar", { default: `${uniqid_1.default("join_")}` }),
    __metadata("design:type", String)
], JoinKeyset.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column("text"),
    __metadata("design:type", String)
], JoinKeyset.prototype, "keysetId", void 0);
__decorate([
    type_graphql_1.Field(() => [String], { nullable: true }),
    typeorm_1.Column("simple-array", { nullable: true }),
    __metadata("design:type", Array)
], JoinKeyset.prototype, "kits", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], JoinKeyset.prototype, "created", void 0);
__decorate([
    type_graphql_1.Field(() => Keyset_1.Keyset, { nullable: true }),
    typeorm_1.ManyToOne(() => Keyset_1.Keyset, keyset => keyset.joins),
    typeorm_1.JoinColumn(),
    __metadata("design:type", Keyset_1.Keyset)
], JoinKeyset.prototype, "keyset", void 0);
__decorate([
    type_graphql_1.Field(() => User_1.User, { nullable: true }),
    typeorm_1.ManyToOne(() => User_1.User, user => user.keysetjoins),
    typeorm_1.JoinColumn(),
    __metadata("design:type", User_1.User)
], JoinKeyset.prototype, "user", void 0);
JoinKeyset = __decorate([
    type_graphql_1.ObjectType(),
    typeorm_1.Entity("joinkeysets")
], JoinKeyset);
exports.JoinKeyset = JoinKeyset;
let JoinKeysetInput = class JoinKeysetInput {
};
__decorate([
    type_graphql_1.Field(() => [String], { nullable: true }),
    __metadata("design:type", Array)
], JoinKeysetInput.prototype, "kits", void 0);
JoinKeysetInput = __decorate([
    type_graphql_1.InputType()
], JoinKeysetInput);
exports.JoinKeysetInput = JoinKeysetInput;
//# sourceMappingURL=JoinKeyset.js.map