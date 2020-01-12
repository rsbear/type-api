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
const Keyboard_1 = require("./Keyboard");
const uniqid_1 = __importDefault(require("uniqid"));
const User_1 = require("./User");
let JoinKeyboard = class JoinKeyboard extends typeorm_1.BaseEntity {
    constructor() {
        super(...arguments);
        this.id = uniqid_1.default("join_");
    }
};
__decorate([
    type_graphql_1.Field(),
    typeorm_1.PrimaryColumn("varchar", { default: `${uniqid_1.default("join_")}` }),
    __metadata("design:type", String)
], JoinKeyboard.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column("text"),
    __metadata("design:type", String)
], JoinKeyboard.prototype, "keyboardId", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column("text"),
    __metadata("design:type", String)
], JoinKeyboard.prototype, "caseChoice", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column("text"),
    __metadata("design:type", String)
], JoinKeyboard.prototype, "plateChoice", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], JoinKeyboard.prototype, "layoutChoice", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], JoinKeyboard.prototype, "created", void 0);
__decorate([
    type_graphql_1.Field(() => Keyboard_1.Keyboard, { nullable: true }),
    typeorm_1.ManyToOne(() => Keyboard_1.Keyboard, keyboard => keyboard.joins),
    typeorm_1.JoinColumn(),
    __metadata("design:type", Keyboard_1.Keyboard)
], JoinKeyboard.prototype, "keyboard", void 0);
__decorate([
    type_graphql_1.Field(() => User_1.User, { nullable: true }),
    typeorm_1.ManyToOne(() => User_1.User, user => user.keyboardjoins),
    typeorm_1.JoinColumn(),
    __metadata("design:type", User_1.User)
], JoinKeyboard.prototype, "user", void 0);
JoinKeyboard = __decorate([
    type_graphql_1.ObjectType(),
    typeorm_1.Entity("joinkeyboards")
], JoinKeyboard);
exports.JoinKeyboard = JoinKeyboard;
let JoinKeyboardInput = class JoinKeyboardInput {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], JoinKeyboardInput.prototype, "caseChoice", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], JoinKeyboardInput.prototype, "plateChoice", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], JoinKeyboardInput.prototype, "layoutChoice", void 0);
JoinKeyboardInput = __decorate([
    type_graphql_1.InputType()
], JoinKeyboardInput);
exports.JoinKeyboardInput = JoinKeyboardInput;
//# sourceMappingURL=JoinKeyboard.js.map