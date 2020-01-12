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
const Keyboard_1 = require("../entity/Keyboard");
const Keyset_1 = require("../entity/Keyset");
const User_1 = require("../entity/User");
const Follow_1 = require("../entity/Follow");
const checkAuth_1 = require("../checkAuth");
let FollowResolvers = class FollowResolvers {
    follows() {
        return Follow_1.Follow.find({ relations: ['keyboard', 'keyset'] });
    }
    createFollow({ payload }, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield User_1.User.findOne(payload.userId);
                console.log(id);
                if (id.includes("kb_")) {
                    const keyboard = yield Keyboard_1.Keyboard.findOne({ id });
                    yield Follow_1.Follow.insert({
                        productId: id,
                        keyboard,
                        user
                    });
                    return true;
                }
                if (id.includes("set_")) {
                    const keyset = yield Keyset_1.Keyset.findOne({ id });
                    yield Follow_1.Follow.insert({
                        productId: id,
                        keyset,
                        user
                    });
                    return true;
                }
            }
            catch (err) {
                console.log(err);
                return false;
            }
        });
    }
    followKeyboard({ payload }, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const keyboard = yield Keyboard_1.Keyboard.findOne({ id });
                const user = yield User_1.User.findOne(payload.userId);
                yield Follow_1.Follow.create({
                    productId: id,
                    keyboard,
                    user
                }).save();
                return true;
            }
            catch (err) {
                console.log(err);
                return false;
            }
        });
    }
    followKeyboardDelete({ payload }, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield User_1.User.findOne(payload.userId);
                if (!user) {
                    return false;
                }
                yield Follow_1.Follow.delete({ id });
                return true;
            }
            catch (err) {
                console.log(err);
                return false;
            }
        });
    }
    followKeyset({ payload }, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const keyset = yield Keyset_1.Keyset.findOne({ id });
                const user = yield User_1.User.findOne(payload.userId);
                yield Follow_1.Follow.create({
                    productId: id,
                    keyset,
                    user
                }).save();
                return true;
            }
            catch (err) {
                console.log(err);
                return false;
            }
        });
    }
    followKeysetDelete({ payload }, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield User_1.User.findOne(payload.userId);
                if (!user) {
                    return false;
                }
                yield Follow_1.Follow.delete({ id });
                return true;
            }
            catch (err) {
                console.log(err);
                return false;
            }
        });
    }
    deleteFollow(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Follow_1.Follow.delete({ id });
            return true;
        });
    }
};
__decorate([
    type_graphql_1.Query(() => [Follow_1.Follow]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], FollowResolvers.prototype, "follows", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    type_graphql_1.UseMiddleware(checkAuth_1.checkAuth),
    __param(0, type_graphql_1.Ctx()),
    __param(1, type_graphql_1.Arg("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], FollowResolvers.prototype, "createFollow", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    type_graphql_1.UseMiddleware(checkAuth_1.checkAuth),
    __param(0, type_graphql_1.Ctx()),
    __param(1, type_graphql_1.Arg("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], FollowResolvers.prototype, "followKeyboard", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    type_graphql_1.UseMiddleware(checkAuth_1.checkAuth),
    __param(0, type_graphql_1.Ctx()),
    __param(1, type_graphql_1.Arg("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], FollowResolvers.prototype, "followKeyboardDelete", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    type_graphql_1.UseMiddleware(checkAuth_1.checkAuth),
    __param(0, type_graphql_1.Ctx()),
    __param(1, type_graphql_1.Arg("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], FollowResolvers.prototype, "followKeyset", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    type_graphql_1.UseMiddleware(checkAuth_1.checkAuth),
    __param(0, type_graphql_1.Ctx()),
    __param(1, type_graphql_1.Arg("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], FollowResolvers.prototype, "followKeysetDelete", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Arg("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FollowResolvers.prototype, "deleteFollow", null);
FollowResolvers = __decorate([
    type_graphql_1.Resolver()
], FollowResolvers);
exports.FollowResolvers = FollowResolvers;
//# sourceMappingURL=FollowResolvers.js.map