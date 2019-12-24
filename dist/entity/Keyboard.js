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
const User_1 = require("./User");
const Edition_1 = require("./Edition");
const JoinKeyboard_1 = require("./JoinKeyboard");
const Post_1 = require("./Post");
const Follow_1 = require("./Follow");
const shortid_1 = __importDefault(require("shortid"));
const uniqid_1 = __importDefault(require("uniqid"));
let Keyboard = class Keyboard extends typeorm_1.BaseEntity {
    constructor() {
        super(...arguments);
        this.id = uniqid_1.default("kb_");
        this.shortId = shortid_1.default.generate().toString();
        this.created = new Date;
        this.updated = new Date;
    }
};
__decorate([
    type_graphql_1.Field({ nullable: true }),
    typeorm_1.Column("text"),
    __metadata("design:type", String)
], Keyboard.prototype, "angle", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    typeorm_1.Column("text", { nullable: true }),
    __metadata("design:type", String)
], Keyboard.prototype, "announcement", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    typeorm_1.Column("text"),
    __metadata("design:type", String)
], Keyboard.prototype, "brand", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    typeorm_1.Column("text"),
    __metadata("design:type", String)
], Keyboard.prototype, "connector", void 0);
__decorate([
    type_graphql_1.Field(() => [String], { nullable: true }),
    typeorm_1.Column("simple-array"),
    __metadata("design:type", Array)
], Keyboard.prototype, "details", void 0);
__decorate([
    type_graphql_1.Field(() => [Edition_1.Edition], { nullable: true }),
    typeorm_1.OneToMany(() => Edition_1.Edition, edition => edition.keyboard, { cascade: true, onDelete: "CASCADE" }),
    __metadata("design:type", Array)
], Keyboard.prototype, "editions", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    typeorm_1.Column("text"),
    __metadata("design:type", String)
], Keyboard.prototype, "firmware", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    typeorm_1.Column("text"),
    __metadata("design:type", String)
], Keyboard.prototype, "mount", void 0);
__decorate([
    type_graphql_1.Field(() => [String], { nullable: true }),
    typeorm_1.Column("simple-array"),
    __metadata("design:type", Array)
], Keyboard.prototype, "layouts", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    typeorm_1.Column("text"),
    __metadata("design:type", String)
], Keyboard.prototype, "pcb", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    typeorm_1.Column("text"),
    __metadata("design:type", String)
], Keyboard.prototype, "name", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    typeorm_1.Column("text"),
    __metadata("design:type", String)
], Keyboard.prototype, "size", void 0);
__decorate([
    type_graphql_1.Field(() => [String], { nullable: true }),
    typeorm_1.Column("simple-array"),
    __metadata("design:type", Array)
], Keyboard.prototype, "support", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.PrimaryColumn("varchar", { default: `${uniqid_1.default("kb_")}` }),
    __metadata("design:type", String)
], Keyboard.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column('varchar', { default: `${shortid_1.default.generate()}` }),
    __metadata("design:type", String)
], Keyboard.prototype, "shortId", void 0);
__decorate([
    type_graphql_1.Field(() => [String], { nullable: true }),
    typeorm_1.Column("simple-array"),
    __metadata("design:type", Array)
], Keyboard.prototype, "images600", void 0);
__decorate([
    type_graphql_1.Field(() => [String], { nullable: true }),
    typeorm_1.Column("simple-array"),
    __metadata("design:type", Array)
], Keyboard.prototype, "images800", void 0);
__decorate([
    type_graphql_1.Field(() => [String], { nullable: true }),
    typeorm_1.Column("simple-array"),
    __metadata("design:type", Array)
], Keyboard.prototype, "images1500", void 0);
__decorate([
    type_graphql_1.Field(() => [String], { nullable: true }),
    typeorm_1.Column("simple-array"),
    __metadata("design:type", Array)
], Keyboard.prototype, "imagesRaw", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], Keyboard.prototype, "created", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", Date)
], Keyboard.prototype, "updated", void 0);
__decorate([
    type_graphql_1.Field(() => User_1.User, { nullable: true }),
    typeorm_1.ManyToOne(() => User_1.User, user => user.keyboards),
    typeorm_1.JoinColumn(),
    __metadata("design:type", User_1.User)
], Keyboard.prototype, "maker", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    typeorm_1.Column("boolean", { nullable: true }),
    __metadata("design:type", Boolean)
], Keyboard.prototype, "interestCheck", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    typeorm_1.Column("boolean", { nullable: true }),
    __metadata("design:type", Boolean)
], Keyboard.prototype, "market", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    typeorm_1.Column("boolean", { nullable: true }),
    __metadata("design:type", Boolean)
], Keyboard.prototype, "groupBuy", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    typeorm_1.Column("boolean", { nullable: true }),
    __metadata("design:type", Boolean)
], Keyboard.prototype, "groupBuySoon", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    typeorm_1.Column("boolean", { nullable: true }),
    __metadata("design:type", Boolean)
], Keyboard.prototype, "closed", void 0);
__decorate([
    type_graphql_1.Field(() => [JoinKeyboard_1.JoinKeyboard], { nullable: true }),
    typeorm_1.OneToMany(() => JoinKeyboard_1.JoinKeyboard, joinkeyboard => joinkeyboard.keyboard, { onDelete: "CASCADE" }),
    __metadata("design:type", Array)
], Keyboard.prototype, "joins", void 0);
__decorate([
    type_graphql_1.Field(() => [Post_1.Post], { nullable: true }),
    typeorm_1.OneToMany(() => Post_1.Post, post => post.keyboard, { onDelete: "CASCADE" }),
    __metadata("design:type", Array)
], Keyboard.prototype, "posts", void 0);
__decorate([
    typeorm_1.OneToMany(() => Follow_1.Follow, follow => follow.keyboard),
    __metadata("design:type", Follow_1.Follow)
], Keyboard.prototype, "follows", void 0);
Keyboard = __decorate([
    type_graphql_1.ObjectType(),
    typeorm_1.Entity("keyboards")
], Keyboard);
exports.Keyboard = Keyboard;
let KeyboardInput = class KeyboardInput {
};
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], KeyboardInput.prototype, "angle", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], KeyboardInput.prototype, "brand", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], KeyboardInput.prototype, "connector", void 0);
__decorate([
    type_graphql_1.Field(() => [String], { nullable: true }),
    __metadata("design:type", Array)
], KeyboardInput.prototype, "details", void 0);
__decorate([
    type_graphql_1.Field(() => Edition_1.EditionInput, { nullable: true }),
    __metadata("design:type", Array)
], KeyboardInput.prototype, "editions", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], KeyboardInput.prototype, "firmware", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], KeyboardInput.prototype, "mount", void 0);
__decorate([
    type_graphql_1.Field(() => [String], { nullable: true }),
    __metadata("design:type", Array)
], KeyboardInput.prototype, "layouts", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], KeyboardInput.prototype, "pcb", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], KeyboardInput.prototype, "name", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], KeyboardInput.prototype, "size", void 0);
__decorate([
    type_graphql_1.Field(() => [String], { nullable: true }),
    __metadata("design:type", Array)
], KeyboardInput.prototype, "support", void 0);
__decorate([
    type_graphql_1.Field(() => Boolean, { nullable: true }),
    __metadata("design:type", Boolean)
], KeyboardInput.prototype, "interestCheck", void 0);
__decorate([
    type_graphql_1.Field(() => Boolean, { nullable: true }),
    __metadata("design:type", Boolean)
], KeyboardInput.prototype, "groupBuy", void 0);
__decorate([
    type_graphql_1.Field(() => Boolean, { nullable: true }),
    __metadata("design:type", Boolean)
], KeyboardInput.prototype, "groupBuySoon", void 0);
__decorate([
    type_graphql_1.Field(() => Boolean, { nullable: true }),
    __metadata("design:type", Boolean)
], KeyboardInput.prototype, "market", void 0);
__decorate([
    type_graphql_1.Field(() => Boolean, { nullable: true }),
    __metadata("design:type", Boolean)
], KeyboardInput.prototype, "closed", void 0);
KeyboardInput = __decorate([
    type_graphql_1.InputType()
], KeyboardInput);
exports.KeyboardInput = KeyboardInput;
//# sourceMappingURL=Keyboard.js.map