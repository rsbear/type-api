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
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const uniqid_1 = __importDefault(require("uniqid"));
const shortid_1 = __importDefault(require("shortid"));
const User_1 = require("./User");
const Kit_1 = require("./Kit");
const Follow_1 = require("./Follow");
const Color_1 = require("./Color");
const JoinKeyset_1 = require("./JoinKeyset");
const Post_1 = require("./Post");
let Keyset = class Keyset extends typeorm_1.BaseEntity {
    constructor() {
        super(...arguments);
        this.id = uniqid_1.default("set_");
        this.shortId = shortid_1.default.generate();
        this.created = new Date;
        this.updated = new Date;
    }
};
__decorate([
    type_graphql_1.Field(),
    typeorm_1.PrimaryColumn("varchar", { default: `${uniqid_1.default("set_")}` }),
    __metadata("design:type", String)
], Keyset.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column("varchar", { default: `${shortid_1.default.generate()}` }),
    __metadata("design:type", String)
], Keyset.prototype, "shortId", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column("text"),
    __metadata("design:type", String)
], Keyset.prototype, "name", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column("text"),
    __metadata("design:type", String)
], Keyset.prototype, "profile", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column("text"),
    __metadata("design:type", String)
], Keyset.prototype, "stem", void 0);
__decorate([
    type_graphql_1.Field(() => [Kit_1.Kit], { nullable: true }),
    typeorm_1.OneToMany(() => Kit_1.Kit, kit => kit.keyset, { onDelete: "CASCADE", onUpdate: 'CASCADE' }),
    __metadata("design:type", Array)
], Keyset.prototype, "kits", void 0);
__decorate([
    type_graphql_1.Field(() => [Color_1.Color], { nullable: true }),
    typeorm_1.OneToMany(() => Color_1.Color, color => color.keyset, { onDelete: "CASCADE", onUpdate: 'CASCADE' }),
    __metadata("design:type", Array)
], Keyset.prototype, "colors", void 0);
__decorate([
    type_graphql_1.Field(() => [String], { nullable: true }),
    typeorm_1.Column("simple-array", { nullable: true }),
    __metadata("design:type", Array)
], Keyset.prototype, "images600", void 0);
__decorate([
    type_graphql_1.Field(() => [String], { nullable: true }),
    typeorm_1.Column("simple-array", { nullable: true }),
    __metadata("design:type", Array)
], Keyset.prototype, "images800", void 0);
__decorate([
    type_graphql_1.Field(() => [String], { nullable: true }),
    typeorm_1.Column("simple-array", { nullable: true }),
    __metadata("design:type", Array)
], Keyset.prototype, "images1500", void 0);
__decorate([
    type_graphql_1.Field(() => [String], { nullable: true }),
    typeorm_1.Column("simple-array", { nullable: true }),
    __metadata("design:type", Array)
], Keyset.prototype, "imagesRaw", void 0);
__decorate([
    type_graphql_1.Field(() => [String], { nullable: true }),
    typeorm_1.Column("simple-array", { nullable: true }),
    __metadata("design:type", Array)
], Keyset.prototype, "details", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], Keyset.prototype, "created", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", Date)
], Keyset.prototype, "updated", void 0);
__decorate([
    type_graphql_1.Field(() => User_1.User, { nullable: true }),
    typeorm_1.ManyToOne(() => User_1.User, user => user.keyboards),
    typeorm_1.JoinColumn(),
    __metadata("design:type", User_1.User)
], Keyset.prototype, "maker", void 0);
__decorate([
    type_graphql_1.Field(() => [JoinKeyset_1.JoinKeyset], { nullable: true }),
    typeorm_1.OneToMany(() => JoinKeyset_1.JoinKeyset, joinkeyset => joinkeyset.keyset, { onDelete: "CASCADE" }),
    __metadata("design:type", Array)
], Keyset.prototype, "joins", void 0);
__decorate([
    type_graphql_1.Field(() => [Post_1.Post], { nullable: true }),
    typeorm_1.OneToMany(() => Post_1.Post, post => post.keyset, { onDelete: "CASCADE" }),
    __metadata("design:type", Array)
], Keyset.prototype, "posts", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    typeorm_1.Column("boolean", { nullable: true }),
    __metadata("design:type", Boolean)
], Keyset.prototype, "interestCheck", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    typeorm_1.Column("boolean", { nullable: true }),
    __metadata("design:type", Boolean)
], Keyset.prototype, "market", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    typeorm_1.Column("boolean", { nullable: true }),
    __metadata("design:type", Boolean)
], Keyset.prototype, "groupBuy", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    typeorm_1.Column("boolean", { nullable: true }),
    __metadata("design:type", Boolean)
], Keyset.prototype, "groupBuySoon", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    typeorm_1.Column("boolean", { nullable: true }),
    __metadata("design:type", Boolean)
], Keyset.prototype, "closed", void 0);
__decorate([
    typeorm_1.OneToMany(() => Follow_1.Follow, follow => follow.keyset),
    __metadata("design:type", Follow_1.Follow)
], Keyset.prototype, "follows", void 0);
Keyset = __decorate([
    type_graphql_1.ObjectType(),
    typeorm_1.Entity("keysets")
], Keyset);
exports.Keyset = Keyset;
let KeysetInput = class KeysetInput {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], KeysetInput.prototype, "name", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], KeysetInput.prototype, "profile", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], KeysetInput.prototype, "stem", void 0);
__decorate([
    type_graphql_1.Field(() => Kit_1.KitInput),
    __metadata("design:type", Array)
], KeysetInput.prototype, "kits", void 0);
__decorate([
    type_graphql_1.Field(() => Color_1.ColorInput, { nullable: true }),
    __metadata("design:type", Array)
], KeysetInput.prototype, "colors", void 0);
__decorate([
    type_graphql_1.Field(() => [String]),
    __metadata("design:type", Array)
], KeysetInput.prototype, "details", void 0);
__decorate([
    type_graphql_1.Field(() => Boolean, { nullable: true }),
    __metadata("design:type", Boolean)
], KeysetInput.prototype, "interestCheck", void 0);
__decorate([
    type_graphql_1.Field(() => Boolean, { nullable: true }),
    __metadata("design:type", Boolean)
], KeysetInput.prototype, "groupBuy", void 0);
__decorate([
    type_graphql_1.Field(() => Boolean, { nullable: true }),
    __metadata("design:type", Boolean)
], KeysetInput.prototype, "groupBuySoon", void 0);
__decorate([
    type_graphql_1.Field(() => Boolean, { nullable: true }),
    __metadata("design:type", Boolean)
], KeysetInput.prototype, "market", void 0);
__decorate([
    type_graphql_1.Field(() => Boolean, { nullable: true }),
    __metadata("design:type", Boolean)
], KeysetInput.prototype, "closed", void 0);
KeysetInput = __decorate([
    type_graphql_1.InputType()
], KeysetInput);
exports.KeysetInput = KeysetInput;
//# sourceMappingURL=Keyset.js.map