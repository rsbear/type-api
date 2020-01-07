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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const type_graphql_1 = require("type-graphql");
const checkAuth_1 = require("../checkAuth");
const graphql_upload_1 = require("graphql-upload");
const uploader_1 = require("../uploader");
const SearchInput_1 = require("../entity/SearchInput");
const User_1 = require("../entity/User");
const Keyset_1 = require("../entity/Keyset");
let KeysetResolvers = class KeysetResolvers {
    keysets() {
        return Keyset_1.Keyset.find({ relations: ['kits', 'maker', 'colors'] });
    }
    keyset(shortId) {
        return Keyset_1.Keyset.findOne({
            where: { shortId },
            relations: [
                'kits',
                'maker',
                'colors',
                'joins',
                'posts',
                'posts.user'
            ],
        });
    }
    sortKeysets(where) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return Keyset_1.Keyset.find({ where: Object.assign({}, where) });
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    makeKeyset({ payload }, data, images) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield User_1.User.findOne(payload.userId);
                const { results600, results800, results1500, resultsRaw } = yield uploader_1.processUploads(images);
                yield Keyset_1.Keyset.create(Object.assign(Object.assign({}, data), { maker: user, images600: results600, images800: results800, images1500: results1500, imagesRaw: resultsRaw })).save();
                return true;
            }
            catch (err) {
                console.log(err);
                return false;
            }
        });
    }
    ;
    updateKeyset(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const rest = __rest(data, []);
                yield Keyset_1.Keyset.update(id, Object.assign({}, rest));
                return true;
            }
            catch (err) {
                console.log(err);
                return false;
            }
        });
    }
    deleteKeyset(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (id) {
                yield Keyset_1.Keyset.delete({ id });
                return true;
            }
            return false;
        });
    }
};
__decorate([
    type_graphql_1.Query(() => [Keyset_1.Keyset]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], KeysetResolvers.prototype, "keysets", null);
__decorate([
    type_graphql_1.Query(() => Keyset_1.Keyset),
    __param(0, type_graphql_1.Arg("shortId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], KeysetResolvers.prototype, "keyset", null);
__decorate([
    type_graphql_1.Query(() => [Keyset_1.Keyset]),
    __param(0, type_graphql_1.Arg("where")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [SearchInput_1.SearchInput]),
    __metadata("design:returntype", Promise)
], KeysetResolvers.prototype, "sortKeysets", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    type_graphql_1.UseMiddleware(checkAuth_1.checkAuth),
    __param(0, type_graphql_1.Ctx()),
    __param(1, type_graphql_1.Arg("data", () => Keyset_1.KeysetInput)),
    __param(2, type_graphql_1.Arg("images", () => [graphql_upload_1.GraphQLUpload])),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], KeysetResolvers.prototype, "makeKeyset", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    type_graphql_1.UseMiddleware(checkAuth_1.checkAuth),
    __param(0, type_graphql_1.Arg("id")),
    __param(1, type_graphql_1.Arg("data")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Keyset_1.KeysetInput]),
    __metadata("design:returntype", Promise)
], KeysetResolvers.prototype, "updateKeyset", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Arg("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], KeysetResolvers.prototype, "deleteKeyset", null);
KeysetResolvers = __decorate([
    type_graphql_1.Resolver()
], KeysetResolvers);
exports.KeysetResolvers = KeysetResolvers;
//# sourceMappingURL=KeysetResolvers.js.map