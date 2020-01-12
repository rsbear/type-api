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
const User_1 = require("./../entity/User");
const tokenGenerators_1 = require("./../tokenGenerators");
const checkAuth_1 = require("./../checkAuth");
const sendRefreshToken_1 = require("./../sendRefreshToken");
const typeorm_1 = require("typeorm");
const jsonwebtoken_1 = require("jsonwebtoken");
const Auth_1 = require("./../entity/Auth");
let LoginResponse = class LoginResponse {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], LoginResponse.prototype, "accessToken", void 0);
__decorate([
    type_graphql_1.Field(() => User_1.User),
    __metadata("design:type", User_1.User)
], LoginResponse.prototype, "user", void 0);
LoginResponse = __decorate([
    type_graphql_1.ObjectType()
], LoginResponse);
let UserResolvers = class UserResolvers {
    bye({ payload }) {
        console.log(payload);
        return `your user id is: ${payload.userId}`;
    }
    users() {
        return User_1.User.find({
            relations: [
                'keyboards',
                'votes',
                'keyboardjoins',
                'keysetjoins',
                'keysetjoins.keyset',
                'follows',
                'follows.keyboard',
                'follows.keyset'
            ]
        });
    }
    me(context) {
        const authorization = context.req.headers["authorization"];
        if (!authorization) {
            return null;
        }
        try {
            const token = authorization.split(" ")[1];
            const payload = jsonwebtoken_1.verify(token, process.env.ACCESS_TOKEN_SECRET);
            return User_1.User.findOne(payload.userId, {
                relations: [
                    'keyboardjoins',
                    'keyboardjoins.keyboard',
                    'keyboards',
                    'keyboards.joins',
                    'keysetjoins',
                    'keysets',
                    'keysets.joins',
                    'follows',
                    'follows.keyboard',
                    'follows.keyset'
                ]
            });
        }
        catch (err) {
            console.log(err);
            return null;
        }
    }
    logout({ res }) {
        return __awaiter(this, void 0, void 0, function* () {
            sendRefreshToken_1.sendRefreshToken(res, "");
            return true;
        });
    }
    revokeRefreshTokensForUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield typeorm_1.getConnection()
                .getRepository(User_1.User)
                .increment({ id: userId }, "tokenVersion", 1);
            return true;
        });
    }
    login(email, secret, { res }) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.User.findOne({ where: { email } });
            const auth = yield Auth_1.Auth.findOne({ where: { email } });
            if (!user) {
                throw new Error("could not find email");
            }
            if (secret !== auth.secret) {
                throw new Error("User found but that's not the magic word");
            }
            sendRefreshToken_1.sendRefreshToken(res, tokenGenerators_1.createRefreshToken(user));
            return {
                accessToken: tokenGenerators_1.createAccessToken(user),
                user
            };
        });
    }
    signup(secret, email, username) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const authSecret = yield Auth_1.Auth.findOne({ where: { email } });
                if (authSecret.secret === secret) {
                    yield User_1.User.insert({
                        email,
                        username
                    });
                }
                else {
                    console.log("secrets didnt match");
                    return false;
                }
            }
            catch (err) {
                console.log(err);
                return false;
            }
            return true;
        });
    }
    banUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield User_1.User.delete({
                    id: id
                });
            }
            catch (err) {
                console.log(err);
                return false;
            }
            return true;
        });
    }
};
__decorate([
    type_graphql_1.Query(() => String),
    type_graphql_1.UseMiddleware(checkAuth_1.checkAuth),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserResolvers.prototype, "bye", null);
__decorate([
    type_graphql_1.Query(() => [User_1.User]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserResolvers.prototype, "users", null);
__decorate([
    type_graphql_1.Query(() => User_1.User, { nullable: true }),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserResolvers.prototype, "me", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserResolvers.prototype, "logout", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Arg("userId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserResolvers.prototype, "revokeRefreshTokensForUser", null);
__decorate([
    type_graphql_1.Mutation(() => LoginResponse),
    __param(0, type_graphql_1.Arg("email")),
    __param(1, type_graphql_1.Arg("secret")),
    __param(2, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], UserResolvers.prototype, "login", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Arg("secret")),
    __param(1, type_graphql_1.Arg("email")),
    __param(2, type_graphql_1.Arg("username")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], UserResolvers.prototype, "signup", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Arg("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserResolvers.prototype, "banUser", null);
UserResolvers = __decorate([
    type_graphql_1.Resolver()
], UserResolvers);
exports.UserResolvers = UserResolvers;
//# sourceMappingURL=UserResolvers.js.map