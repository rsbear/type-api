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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const type_graphql_1 = require("type-graphql");
const rword_1 = require("rword");
const Auth_1 = require("./../entity/Auth");
const User_1 = require("./../entity/User");
const SuccessResponse_1 = require("./../entity/SuccessResponse");
const mailGunner_1 = __importDefault(require("../mailGunner"));
let AuthResolvers = class AuthResolvers {
    auths() {
        return Auth_1.Auth.find();
    }
    generateSignupAuth(email, username) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userEmail = yield User_1.User.findOne({ where: { email } });
                const userUsername = yield User_1.User.findOne({ where: { username } });
                if (userEmail) {
                    return {
                        success: false,
                        message: 'Email already in use.'
                    };
                }
                if (userUsername) {
                    return {
                        success: false,
                        message: 'Username taken, try a different one.'
                    };
                }
                yield Auth_1.Auth.insert({
                    email,
                    secret: rword_1.rword.generate(1, { length: 5 }).toString()
                });
            }
            catch (err) {
                console.log(err);
                return {
                    success: false,
                    message: 'Something went wrong.'
                };
            }
            return {
                success: true,
                message: "Sign up auth ticket successfully created."
            };
        });
    }
    generateAuth(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield User_1.User.findOne({ where: { email } });
                if (!user) {
                    throw new Error("Invalid email");
                }
                if (email) {
                    yield Auth_1.Auth.delete({ email: email });
                }
                const securityWord = rword_1.rword.generate(1, { length: 5 }).toString();
                const data = {
                    token: securityWord,
                    email: user.email
                };
                const subjectTitle = "typefeel Login";
                const content = `<div style="margin: 0 auto; max-width: 600px;">
            <h1 style="margin-bottom: 30px;">typefeel</h1>
          <h2>${data.token}</h2>
            <p style="font-size: 18px;">Login with your token by clicking the link below.</p>
            <a style="font-size: 16px; color: white; background-color: black; padding: 8px 16px; border-radius: 4px; text-decoration: none;" href="https://typefeel.com/auth/${encodeURIComponent(data.email)}&token=${data.token}">Log me in</a>
            <br />
            <br />
            <p style="font-size: 18px;">Cheers, typefeel</p>
          </div>
        `;
                mailGunner_1.default(user.email, subjectTitle, content);
                yield Auth_1.Auth.insert({
                    email,
                    secret: rword_1.rword.generate(1, { length: 5 }).toString()
                });
            }
            catch (err) {
                console.log(err);
                return false;
            }
            return true;
        });
    }
    deleteAuth(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield Auth_1.Auth.delete({
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
    type_graphql_1.Query(() => [Auth_1.Auth]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AuthResolvers.prototype, "auths", null);
__decorate([
    type_graphql_1.Mutation(() => SuccessResponse_1.SuccessResponse),
    __param(0, type_graphql_1.Arg("email")),
    __param(1, type_graphql_1.Arg("username")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AuthResolvers.prototype, "generateSignupAuth", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Arg("email")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthResolvers.prototype, "generateAuth", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Arg("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthResolvers.prototype, "deleteAuth", null);
AuthResolvers = __decorate([
    type_graphql_1.Resolver()
], AuthResolvers);
exports.AuthResolvers = AuthResolvers;
//# sourceMappingURL=AuthResolvers.js.map