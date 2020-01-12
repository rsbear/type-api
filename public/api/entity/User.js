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
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const type_graphql_1 = require("type-graphql");
const Keyboard_1 = require("./Keyboard");
const Keyset_1 = require("./Keyset");
const Vote_1 = require("./Vote");
const JoinKeyboard_1 = require("./JoinKeyboard");
const JoinKeyset_1 = require("./JoinKeyset");
const Follow_1 = require("./Follow");
let User = class User extends typeorm_1.BaseEntity {
};
__decorate([
    type_graphql_1.Field(),
    typeorm_1.PrimaryGeneratedColumn("uuid"),
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column("text"),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column("text"),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    typeorm_1.Column("int", { default: 0 }),
    __metadata("design:type", Number)
], User.prototype, "tokenVersion", void 0);
__decorate([
    typeorm_1.OneToMany(() => Keyboard_1.Keyboard, keyboard => keyboard.maker),
    type_graphql_1.Field(() => [Keyboard_1.Keyboard]),
    __metadata("design:type", Array)
], User.prototype, "keyboards", void 0);
__decorate([
    typeorm_1.OneToMany(() => Keyset_1.Keyset, keyset => keyset.maker),
    type_graphql_1.Field(() => [Keyset_1.Keyset]),
    __metadata("design:type", Array)
], User.prototype, "keysets", void 0);
__decorate([
    type_graphql_1.Field(() => [Vote_1.Vote]),
    typeorm_1.OneToMany(() => Vote_1.Vote, vote => vote.user),
    __metadata("design:type", Array)
], User.prototype, "votes", void 0);
__decorate([
    type_graphql_1.Field(() => [Follow_1.Follow]),
    typeorm_1.OneToMany(() => Follow_1.Follow, follow => follow.user),
    __metadata("design:type", Follow_1.Follow)
], User.prototype, "follows", void 0);
__decorate([
    type_graphql_1.Field(() => [JoinKeyboard_1.JoinKeyboard]),
    typeorm_1.OneToMany(() => JoinKeyboard_1.JoinKeyboard, joinkb => joinkb.user),
    __metadata("design:type", Array)
], User.prototype, "keyboardjoins", void 0);
__decorate([
    type_graphql_1.Field(() => [JoinKeyset_1.JoinKeyset]),
    typeorm_1.OneToMany(() => JoinKeyset_1.JoinKeyset, joinset => joinset.user),
    __metadata("design:type", Array)
], User.prototype, "keysetjoins", void 0);
User = __decorate([
    type_graphql_1.ObjectType(),
    typeorm_1.Entity("users")
], User);
exports.User = User;
//# sourceMappingURL=User.js.map