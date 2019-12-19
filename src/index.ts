import 'dotenv/config';
import 'reflect-metadata'
import express from "express";
import { ApolloServer } from 'apollo-server-express'
import { buildSchema } from 'type-graphql'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { verify } from 'jsonwebtoken';
import { createConnection } from 'typeorm';
import { User } from './entity/User'
import { createAccessToken, createRefreshToken } from './tokenGenerators'
import { sendRefreshToken } from './sendRefreshToken'

import { UserResolvers } from './resolvers/UserResolvers'
import { AuthResolvers } from './resolvers/AuthResolvers'
import { KeyboardResolvers } from './resolvers/KeyboardResolvers'
import { KeysetResolvers } from './resolvers/KeysetResolvers'
import { EditionResolvers } from './resolvers/EditionResolvers';
import { VoteResolvers } from './resolvers/VoteResolvers';
import { JoinKeyboardResolver } from './resolvers/JoinKeyboardResolver';
import { JoinKeysetResolver } from './resolvers/JoinKeysetResolver';
import { PostResolver } from './resolvers/PostResolver';
import { FollowResolvers } from './resolvers/FollowResolvers';



(async () => {
  const app = express()
  app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
  }))
  app.use(cookieParser())
  app.get("/", (_req, res) => res.send("check 1 2"))
  app.post("/refresh_token", async (req, res) => {
    const token = req.cookies.rfs
    if (!token) {
      return res.send({ ok: false, accessToken: "" })
    }

    let payload: any = null
    try {
      payload = verify(token, process.env.REFRESH_TOKEN_SECRET!)
    } catch (err) {
      console.log(err)
      return res.send({ ok: false, accessToken: "" })
    }

    // token is valid and
    // we can send back an access token
    const user = await User.findOne({ id: payload.userId });

    if (!user) {
      return res.send({ ok: false, accessToken: "" });
    }

    if (user.tokenVersion !== payload.tokenVersion) {
      return res.send({ ok: false, accessToken: "" });
    }

    sendRefreshToken(res, createRefreshToken(user));

    return res.send({ ok: true, accessToken: createAccessToken(user) });
  })

  await createConnection()

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
        FollowResolvers,
      ]
    }),
    context: ({ req, res }) => ({ req, res })
  });

  apolloServer.applyMiddleware({ app, cors: false });

  app.listen(4000, () => {
    console.log('🚀 ------ UP UP AND AWAY http://localhost:4000/graphql')
  })
})();

