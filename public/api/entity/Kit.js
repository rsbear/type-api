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
const Keyset_1 = require("./Keyset");
let Kit = class Kit extends typeorm_1.BaseEntity {
    constructor() {
        super(...arguments);
        this.id = uniqid_1.default("kit_");
    }
};
__decorate([
    type_graphql_1.Field(() => String),
    typeorm_1.PrimaryColumn("varchar", { default: `${uniqid_1.default("kit_")}` }),
    __metadata("design:type", String)
], Kit.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    typeorm_1.Column("text", { nullable: true }),
    __metadata("design:type", String)
], Kit.prototype, "kit", void 0);
__decorate([
    type_graphql_1.Field(() => type_graphql_1.Int, { nullable: true }),
    typeorm_1.Column("int"),
    __metadata("design:type", Number)
], Kit.prototype, "price", void 0);
__decorate([
    type_graphql_1.Field(() => type_graphql_1.Int, { nullable: true }),
    typeorm_1.Column("int", { nullable: true }),
    __metadata("design:type", Object)
], Kit.prototype, "suggestedPrice", void 0);
__decorate([
    type_graphql_1.Field(() => String, { nullable: true }),
    typeorm_1.Column("text"),
    __metadata("design:type", String)
], Kit.prototype, "name", void 0);
__decorate([
    typeorm_1.ManyToOne(() => Keyset_1.Keyset, keyset => keyset.kits, { cascade: true }),
    typeorm_1.JoinColumn(),
    __metadata("design:type", Keyset_1.Keyset)
], Kit.prototype, "keyset", void 0);
Kit = __decorate([
    type_graphql_1.ObjectType(),
    typeorm_1.Entity("kits")
], Kit);
exports.Kit = Kit;
let KitInput = class KitInput {
};
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], KitInput.prototype, "kit", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], KitInput.prototype, "name", void 0);
__decorate([
    type_graphql_1.Field(() => type_graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], KitInput.prototype, "price", void 0);
__decorate([
    type_graphql_1.Field(() => type_graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], KitInput.prototype, "suggestedPrice", void 0);
KitInput = __decorate([
    type_graphql_1.InputType()
], KitInput);
exports.KitInput = KitInput;
//# sourceMappingURL=Kit.js.map