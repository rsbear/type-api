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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const type_graphql_1 = require("type-graphql");
const JoinKeyboard_1 = require("../entity/JoinKeyboard");
const Keyboard_1 = require("../entity/Keyboard");
const User_1 = require("../entity/User");
const checkAuth_1 = require("../checkAuth");
let JoinKeyboardResolver = class JoinKeyboardResolver {
    joinss() {
        return JoinKeyboard_1.JoinKeyboard.find({ relations: ['keyboard'] });
    }
    joinKeyboard({ payload }, id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const keyboard = yield Keyboard_1.Keyboard.findOne({ id });
                const user = yield User_1.User.findOne(payload.userId);
                yield JoinKeyboard_1.JoinKeyboard.create(Object.assign(Object.assign({}, data), { keyboardId: id, keyboard,
                    user })).save();
                return true;
            }
            catch (err) {
                console.log(err);
                return false;
            }
        });
    }
    deleteJoin(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield JoinKeyboard_1.JoinKeyboard.delete(id);
            return true;
        });
    }
};
__decorate([
    type_graphql_1.Query(() => [JoinKeyboard_1.JoinKeyboard]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], JoinKeyboardResolver.prototype, "joinss", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    type_graphql_1.UseMiddleware(checkAuth_1.checkAuth),
    __param(0, type_graphql_1.Ctx()),
    __param(1, type_graphql_1.Arg("id")),
    __param(2, type_graphql_1.Arg("data", () => JoinKeyboard_1.JoinKeyboardInput)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, JoinKeyboard_1.JoinKeyboardInput]),
    __metadata("design:returntype", Promise)
], JoinKeyboardResolver.prototype, "joinKeyboard", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Arg("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], JoinKeyboardResolver.prototype, "deleteJoin", null);
JoinKeyboardResolver = __decorate([
    type_graphql_1.Resolver()
], JoinKeyboardResolver);
exports.JoinKeyboardResolver = JoinKeyboardResolver;
//# sourceMappingURL=JoinKeyboardResolver.js.map