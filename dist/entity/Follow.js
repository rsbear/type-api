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
const Keyboard_1 = require("./Keyboard");
const Keyset_1 = require("./Keyset");
let Follow = class Follow extends typeorm_1.BaseEntity {
    constructor() {
        super(...arguments);
        this.id = uniqid_1.default("flw_");
    }
};
__decorate([
    type_graphql_1.Field(() => String),
    typeorm_1.PrimaryColumn("varchar", { default: `${uniqid_1.default("flw_")}` }),
    __metadata("design:type", String)
], Follow.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    typeorm_1.Column("text", { nullable: true }),
    __metadata("design:type", String)
], Follow.prototype, "productId", void 0);
__decorate([
    type_graphql_1.Field(() => Keyboard_1.Keyboard, { nullable: true }),
    typeorm_1.ManyToOne(() => Keyboard_1.Keyboard, keyboard => keyboard.follows),
    __metadata("design:type", Keyboard_1.Keyboard)
], Follow.prototype, "keyboard", void 0);
__decorate([
    type_graphql_1.Field(() => Keyset_1.Keyset, { nullable: true }),
    typeorm_1.ManyToOne(() => Keyset_1.Keyset, keyset => keyset.follows),
    __metadata("design:type", Keyset_1.Keyset)
], Follow.prototype, "keyset", void 0);
__decorate([
    typeorm_1.ManyToOne(() => User_1.User, user => user.follows, { onDelete: 'CASCADE' }),
    typeorm_1.JoinColumn(),
    __metadata("design:type", User_1.User)
], Follow.prototype, "user", void 0);
Follow = __decorate([
    type_graphql_1.ObjectType(),
    typeorm_1.Entity("follows")
], Follow);
exports.Follow = Follow;
let FollowInput = class FollowInput {
};
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], FollowInput.prototype, "productId", void 0);
FollowInput = __decorate([
    type_graphql_1.InputType()
], FollowInput);
exports.FollowInput = FollowInput;
//# sourceMappingURL=Follow.js.map