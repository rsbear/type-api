"use strict";
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
require("dotenv/config");
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const type_graphql_1 = require("type-graphql");
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const jsonwebtoken_1 = require("jsonwebtoken");
const typeorm_1 = require("typeorm");
const User_1 = require("./entity/User");
const tokenGenerators_1 = require("./tokenGenerators");
const sendRefreshToken_1 = require("./sendRefreshToken");
const UserResolvers_1 = require("./resolvers/UserResolvers");
const AuthResolvers_1 = require("./resolvers/AuthResolvers");
const KeyboardResolvers_1 = require("./resolvers/KeyboardResolvers");
const KeysetResolvers_1 = require("./resolvers/KeysetResolvers");
const EditionResolvers_1 = require("./resolvers/EditionResolvers");
const VoteResolvers_1 = require("./resolvers/VoteResolvers");
const JoinKeyboardResolver_1 = require("./resolvers/JoinKeyboardResolver");
const JoinKeysetResolver_1 = require("./resolvers/JoinKeysetResolver");
const PostResolver_1 = require("./resolvers/PostResolver");
const FollowResolvers_1 = require("./resolvers/FollowResolvers");
(() => __awaiter(void 0, void 0, void 0, function* () {
    const app = express_1.default();
    app.use(cors_1.default({
        origin: 'http://localhost:3000',
        credentials: true
    }));
    app.use(cookie_parser_1.default());
    app.get("/", (_req, res) => res.send("check 1 2"));
    app.post("/refresh_token", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const token = req.cookies.rfs;
        if (!token) {
            return res.send({ ok: false, accessToken: "" });
        }
        let payload = null;
        try {
            payload = jsonwebtoken_1.verify(token, process.env.REFRESH_TOKEN_SECRET);
        }
        catch (err) {
            console.log(err);
            return res.send({ ok: false, accessToken: "" });
        }
        const user = yield User_1.User.findOne({ id: payload.userId });
        if (!user) {
            return res.send({ ok: false, accessToken: "" });
        }
        if (user.tokenVersion !== payload.tokenVersion) {
            return res.send({ ok: false, accessToken: "" });
        }
        sendRefreshToken_1.sendRefreshToken(res, tokenGenerators_1.createRefreshToken(user));
        return res.send({ ok: true, accessToken: tokenGenerators_1.createAccessToken(user) });
    }));
    yield typeorm_1.createConnection();
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema: yield type_graphql_1.buildSchema({
            validate: false,
            resolvers: [
                AuthResolvers_1.AuthResolvers,
                KeyboardResolvers_1.KeyboardResolvers,
                KeysetResolvers_1.KeysetResolvers,
                UserResolvers_1.UserResolvers,
                EditionResolvers_1.EditionResolvers,
                VoteResolvers_1.VoteResolvers,
                JoinKeyboardResolver_1.JoinKeyboardResolver,
                JoinKeysetResolver_1.JoinKeysetResolver,
                PostResolver_1.PostResolver,
                FollowResolvers_1.FollowResolvers,
            ]
        }),
        context: ({ req, res }) => ({ req, res })
    });
    apolloServer.applyMiddleware({ app, cors: false });
    app.listen(4000, () => {
        console.log('🚀 ------ UP UP AND AWAY http://localhost:4000/graphql');
    });
}))();
//# sourceMappingURL=index.js.map