import "dotenv/config";
import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import cors from "cors";
import cookieParser from "cookie-parser";
import { verify } from "jsonwebtoken";
import { ConnectionOptions, createConnection } from "typeorm";
import { User } from "./entity/User";
import { createAccessToken, createRefreshToken } from "./tokenGenerators";
import { sendRefreshToken } from "./sendRefreshToken";
import * as entities from "./entity";
import { values } from "lodash";

import { UserResolvers } from "./resolvers/UserResolvers";
import { AuthResolvers } from "./resolvers/AuthResolvers";
import { KeyboardResolvers } from "./resolvers/KeyboardResolvers";
import { KeysetResolvers } from "./resolvers/KeysetResolvers";
import { EditionResolvers } from "./resolvers/EditionResolvers";
import { VoteResolvers } from "./resolvers/VoteResolvers";
import { JoinKeyboardResolver } from "./resolvers/JoinKeyboardResolver";
import { JoinKeysetResolver } from "./resolvers/JoinKeysetResolver";
import { PostResolver } from "./resolvers/PostResolver";
import { FollowResolvers } from "./resolvers/FollowResolvers";

const origin =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:3000"
    : "https://typefeel.com";

(async () => {
  const app = express();
  app.use(
    cors({
      origin: origin,
      credentials: true
    })
  );
  app.use(function(_, res, next) {
    res.header("Access-Control-Allow-Origin", origin); // update to match the domain you will make the request from
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });
  app.use(cookieParser());
  app.get("/", (_req, res) => res.send("check 1 2"));
  app.post("/refresh_token", async (req, res) => {
    const token = req.cookies.rfs;
    if (!token) {
      return res.send({ ok: false, accessToken: "" });
    }

    let payload: any = null;
    try {
      payload = verify(token, process.env.REFRESH_TOKEN_SECRET!);
    } catch (err) {
      console.log(err);
      return res.send({ ok: false, accessToken: "" });
    }

    const user = await User.findOne({ id: payload.userId });
    if (!user) {
      return res.send({ ok: false, accessToken: "" });
    }

    if (user.tokenVersion !== payload.tokenVersion) {
      return res.send({ ok: false, accessToken: "" });
    }

    sendRefreshToken(res, createRefreshToken(user));

    return res.send({ ok: true, accessToken: createAccessToken(user) });
  });

  const dbConfig: ConnectionOptions = {
    type: "postgres",
    entities: values(entities),
    // ...(process.env.DB_URL
    //   ? {
    //     url: process.env.DB_URL,
    //   }
    //   : {

    host: process.env.TYPEORM_HOST,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE,
    port: 25060 || 5432,
    extra: {
      ssl: true
    },

    // }),
    synchronize: true,
    logging: false,
    logger: "file"
  };

  await createConnection(dbConfig).catch((error: any) => {
    console.log(error);
  });

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      validate: false,
      resolvers: [
        AuthResolvers,
        KeyboardResolvers,
        KeysetResolvers,
        UserResolvers,
        EditionResolvers,
        VoteResolvers,
        JoinKeyboardResolver,
        JoinKeysetResolver,
        PostResolver,
        FollowResolvers
      ]
    }),
    context: ({ req, res }) => ({ req, res })
  });

  apolloServer.applyMiddleware({ app, cors: false });

  app.listen(
    { port: process.env.NODE_ENV !== "production" ? 4000 : process.env.PORT },
    () => {
      console.log("🚀 ------ UP UP AND AWAY");
      console.log(
        process.env.NODE_ENV !== "production"
          ? "In development mode"
          : "Production deployment"
      );
    }
  );
})();
