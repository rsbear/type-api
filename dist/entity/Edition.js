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
const shortid_1 = __importDefault(require("shortid"));
const uniqid_1 = __importDefault(require("uniqid"));
const Keyboard_1 = require("./Keyboard");
let Edition = class Edition extends typeorm_1.BaseEntity {
    constructor() {
        super(...arguments);
        this.id = uniqid_1.default("ed_");
        this.shortId = shortid_1.default.generate().toString();
    }
};
__decorate([
    type_graphql_1.Field(() => String),
    typeorm_1.PrimaryColumn("varchar", { default: `${uniqid_1.default("ed_")}` }),
    __metadata("design:type", String)
], Edition.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    typeorm_1.Column("varchar", { default: `${shortid_1.default.generate()}` }),
    __metadata("design:type", String)
], Edition.prototype, "shortId", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    typeorm_1.Column("text", { nullable: true }),
    __metadata("design:type", String)
], Edition.prototype, "name", void 0);
__decorate([
    type_graphql_1.Field(() => type_graphql_1.Int, { nullable: true }),
    typeorm_1.Column("int"),
    __metadata("design:type", Number)
], Edition.prototype, "price", void 0);
__decorate([
    type_graphql_1.Field(() => type_graphql_1.Int, { nullable: true }),
    typeorm_1.Column("int"),
    __metadata("design:type", Number)
], Edition.prototype, "suggestedPrice", void 0);
__decorate([
    type_graphql_1.Field(() => [String], { nullable: true }),
    typeorm_1.Column("simple-array"),
    __metadata("design:type", Array)
], Edition.prototype, "cases", void 0);
__decorate([
    type_graphql_1.Field(() => [String], { nullable: true }),
    typeorm_1.Column("simple-array"),
    __metadata("design:type", Array)
], Edition.prototype, "colors", void 0);
__decorate([
    type_graphql_1.Field(() => [String], { nullable: true }),
    typeorm_1.Column("simple-array"),
    __metadata("design:type", Array)
], Edition.prototype, "plates", void 0);
__decorate([
    typeorm_1.ManyToOne(() => Keyboard_1.Keyboard, keyboard => keyboard.editions, { onDelete: 'CASCADE' }),
    typeorm_1.JoinColumn(),
    __metadata("design:type", Keyboard_1.Keyboard)
], Edition.prototype, "keyboard", void 0);
Edition = __decorate([
    type_graphql_1.ObjectType(),
    typeorm_1.Entity("editions")
], Edition);
exports.Edition = Edition;
let EditionInput = class EditionInput {
};
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], EditionInput.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], EditionInput.prototype, "name", void 0);
__decorate([
    type_graphql_1.Field(() => type_graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], EditionInput.prototype, "price", void 0);
__decorate([
    type_graphql_1.Field(() => type_graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], EditionInput.prototype, "suggestedPrice", void 0);
__decorate([
    type_graphql_1.Field(() => [String], { nullable: true }),
    __metadata("design:type", Array)
], EditionInput.prototype, "cases", void 0);
__decorate([
    type_graphql_1.Field(() => [String], { nullable: true }),
    __metadata("design:type", Array)
], EditionInput.prototype, "colors", void 0);
__decorate([
    type_graphql_1.Field(() => [String], { nullable: true }),
    __metadata("design:type", Array)
], EditionInput.prototype, "plates", void 0);
EditionInput = __decorate([
    type_graphql_1.InputType()
], EditionInput);
exports.EditionInput = EditionInput;
//# sourceMappingURL=Edition.js.map