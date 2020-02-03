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
const Edition_1 = require("../entity/Edition");
const Vote_1 = require("../entity/Vote");
const checkAuth_1 = require("../checkAuth");
const User_1 = require("../entity/User");
const dayjs_1 = __importDefault(require("dayjs"));
const entity_1 = require("../entity");
let VoteResolvers = class VoteResolvers {
    votes() {
        return Vote_1.Vote.find();
    }
    voteKeyboardUp({ payload }, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield User_1.User.findOne(payload.userId, { relations: ['votes'] });
                const edition = yield Edition_1.Edition.findOne(id);
                if (!user || !edition) {
                    return false;
                }
                const userVotes = user.votes.map((v) => v.editionId);
                if (userVotes.includes(id)) {
                    console.log(`User votes includes editionId`);
                    const vote = yield Vote_1.Vote.findOne({ where: { editionId: id } });
                    const voteExp = dayjs_1.default(vote.expiration);
                    const nowDate = dayjs_1.default(new Date);
                    if (voteExp.isAfter(nowDate)) {
                        console.log(`TOO EARLY`);
                        throw new Error('Voted already, try again in 5 days');
                    }
                    console.log(`DELETING existing vote`);
                    yield Vote_1.Vote.delete({ id: vote.id });
                }
                yield Vote_1.Vote.insert({
                    editionId: id,
                    user
                });
                const newPrice = edition.suggestedPrice === null ?
                    Math.trunc(edition.price + (edition.price * .03))
                    : Math.trunc(edition.suggestedPrice + (edition.suggestedPrice * .03));
                yield Edition_1.Edition.update(id, { suggestedPrice: newPrice });
                return true;
            }
            catch (err) {
                console.log(err);
                return false;
            }
        });
    }
    voteKeyboardDown({ payload }, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield User_1.User.findOne(payload.userId, { relations: ['votes'] });
                const edition = yield Edition_1.Edition.findOne(id);
                if (!user || !edition) {
                    return false;
                }
                const userVotes = user.votes.map((v) => v.editionId);
                if (userVotes.includes(id)) {
                    console.log(`User votes includes editionId`);
                    const vote = yield Vote_1.Vote.findOne({ where: { editionId: id } });
                    const voteExp = dayjs_1.default(vote.expiration);
                    const nowDate = dayjs_1.default(new Date);
                    console.log(`vote exp ${voteExp}`);
                    console.log(`now time ${nowDate}`);
                    if (voteExp.isAfter(nowDate)) {
                        console.log(`TOO EARLY`);
                        throw new Error('Voted already, try again in 5 days');
                    }
                    console.log(`DELETING existing vote`);
                    yield Vote_1.Vote.delete({ id: vote.id });
                }
                console.log(`Making new vote`);
                yield Vote_1.Vote.create({
                    editionId: id,
                    user
                }).save();
                const newPrice = edition.suggestedPrice === null ?
                    Math.trunc(edition.price - (edition.price * .015))
                    : Math.trunc(edition.suggestedPrice - (edition.suggestedPrice * .015));
                yield Edition_1.Edition.update(id, { suggestedPrice: newPrice });
                return true;
            }
            catch (err) {
                console.log(err);
                return false;
            }
        });
    }
    voteKitUp({ payload }, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield User_1.User.findOne(payload.userId, { relations: ['votes'] });
                const kit = yield entity_1.Kit.findOne(id);
                if (!user || !kit) {
                    return false;
                }
                const userVotes = user.votes.map((v) => v.kitId);
                if (userVotes.includes(id)) {
                    console.log(`User votes includes kitId`);
                    const vote = yield Vote_1.Vote.findOne({ where: { setId: id } });
                    const voteExp = dayjs_1.default(vote.expiration);
                    const nowDate = dayjs_1.default(new Date);
                    if (voteExp.isAfter(nowDate)) {
                        console.log(`TOO EARLY`);
                        throw new Error('Voted already, try again in 5 days');
                    }
                    console.log(`DELETING existing vote`);
                    yield Vote_1.Vote.delete({ id: vote.id });
                }
                yield Vote_1.Vote.insert({
                    kitId: id,
                    user
                });
                const newPrice = kit.suggestedPrice !== null ?
                    Math.trunc(kit.suggestedPrice + (kit.suggestedPrice * .03))
                    : Math.trunc(kit.price + (kit.price * .03));
                console.log(newPrice);
                yield entity_1.Kit.update(id, { suggestedPrice: newPrice });
                return true;
            }
            catch (err) {
                console.log(err);
                return false;
            }
        });
    }
    voteKitDown({ payload }, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield User_1.User.findOne(payload.userId, { relations: ['votes'] });
                const kit = yield entity_1.Kit.findOne(id);
                if (!user || !kit) {
                    return false;
                }
                const userVotes = user.votes.map((v) => v.kitId);
                if (userVotes.includes(id)) {
                    console.log(`User votes includes editionId`);
                    const vote = yield Vote_1.Vote.findOne({ where: { kitId: id } });
                    const voteExp = dayjs_1.default(vote.expiration);
                    const nowDate = dayjs_1.default(new Date);
                    console.log(`vote exp ${voteExp}`);
                    console.log(`now time ${nowDate}`);
                    if (voteExp.isAfter(nowDate)) {
                        console.log(`TOO EARLY`);
                        throw new Error('Voted already, try again in 5 days');
                    }
                    console.log(`DELETING existing vote`);
                    yield Vote_1.Vote.delete({ id: vote.id });
                }
                console.log(`Making new vote`);
                yield Vote_1.Vote.insert({
                    kitId: id,
                    user
                });
                const newPrice = kit.suggestedPrice !== null ?
                    Math.trunc(kit.suggestedPrice - (kit.suggestedPrice * .015))
                    : Math.trunc(kit.price - (kit.price * .015));
                console.log(newPrice);
                yield entity_1.Kit.update(id, { suggestedPrice: newPrice });
                return true;
            }
            catch (err) {
                console.log(err);
                return false;
            }
        });
    }
    deleteVote(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield Vote_1.Vote.delete({ id });
                return true;
            }
            catch (err) {
                console.log(err);
                return false;
            }
        });
    }
};
__decorate([
    type_graphql_1.Query(() => [Vote_1.Vote]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], VoteResolvers.prototype, "votes", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    type_graphql_1.UseMiddleware(checkAuth_1.checkAuth),
    __param(0, type_graphql_1.Ctx()),
    __param(1, type_graphql_1.Arg("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], VoteResolvers.prototype, "voteKeyboardUp", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    type_graphql_1.UseMiddleware(checkAuth_1.checkAuth),
    __param(0, type_graphql_1.Ctx()),
    __param(1, type_graphql_1.Arg("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], VoteResolvers.prototype, "voteKeyboardDown", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    type_graphql_1.UseMiddleware(checkAuth_1.checkAuth),
    __param(0, type_graphql_1.Ctx()),
    __param(1, type_graphql_1.Arg("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], VoteResolvers.prototype, "voteKitUp", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    type_graphql_1.UseMiddleware(checkAuth_1.checkAuth),
    __param(0, type_graphql_1.Ctx()),
    __param(1, type_graphql_1.Arg("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], VoteResolvers.prototype, "voteKitDown", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Arg("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], VoteResolvers.prototype, "deleteVote", null);
VoteResolvers = __decorate([
    type_graphql_1.Resolver()
], VoteResolvers);
exports.VoteResolvers = VoteResolvers;
//# sourceMappingURL=VoteResolvers.js.map