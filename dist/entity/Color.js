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
let Color = class Color extends typeorm_1.BaseEntity {
    constructor() {
        super(...arguments);
        this.id = uniqid_1.default("clr_");
    }
};
__decorate([
    type_graphql_1.Field(() => String),
    typeorm_1.PrimaryColumn("varchar", { default: `${uniqid_1.default("clr_")}` }),
    __metadata("design:type", String)
], Color.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    typeorm_1.Column("text", { nullable: true }),
    __metadata("design:type", String)
], Color.prototype, "hex", void 0);
__decorate([
    type_graphql_1.Field(() => String, { nullable: true }),
    typeorm_1.Column("text"),
    __metadata("design:type", String)
], Color.prototype, "ral", void 0);
__decorate([
    typeorm_1.ManyToOne(() => Keyset_1.Keyset, keyset => keyset.colors, { onDelete: 'CASCADE' }),
    typeorm_1.JoinColumn(),
    __metadata("design:type", Keyset_1.Keyset)
], Color.prototype, "keyset", void 0);
Color = __decorate([
    type_graphql_1.ObjectType(),
    typeorm_1.Entity("colors")
], Color);
exports.Color = Color;
let ColorInput = class ColorInput {
};
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], ColorInput.prototype, "hex", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], ColorInput.prototype, "ral", void 0);
ColorInput = __decorate([
    type_graphql_1.InputType()
], ColorInput);
exports.ColorInput = ColorInput;
//# sourceMappingURL=Color.js.map