import {
  Resolver,
  Query,
  Mutation,
  Arg,
  ObjectType,
  Field,
  Ctx,
  UseMiddleware,
} from "type-graphql";
import { User } from "./../entity/User";
import { AppContext } from "./../AppContext";
import { createRefreshToken, createAccessToken } from "./../tokenGenerators";
import { checkAuth } from "./../checkAuth";
import { sendRefreshToken, sendRefreshToken2 } from "./../sendRefreshToken";
import { getConnection } from "typeorm";
import { verify } from "jsonwebtoken";
import { Auth } from "./../entity/Auth";

@ObjectType()
class LoginResponse {
  @Field()
  accessToken: string;
  @Field(() => User, { nullable: true })
  user: User;
}



@Resolver()
export class UserResolvers {
  @Query(() => String)
  @UseMiddleware(checkAuth)
  bye(@Ctx() { payload }: AppContext) {
    console.log(payload);
    return `your user id is: ${payload!.userId}`;
  }

  @Query(() => [User])
  users() {
    return User.find({
      relations: [
        'keyboards',
        'votes',
        'keyboardjoins',
        'keyboardjoins.keyboard',
        'keysetjoins',
        'keysetjoins.keyset',
        'follows',
        'follows.keyboard',
        'follows.keyset'
      ]
    });
  }

  @Query(() => User, { nullable: true })
  me(@Ctx() context: AppContext) {
    const authorization = context.req.headers["authorization"];

    if (!authorization) {
      return null;
    }

    try {
      const token = authorization.split(" ")[1];
      const payload: any = verify(token, process.env.ACCESS_TOKEN_SECRET!);
      return User.findOne(payload.userId, {
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
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  @Mutation(() => Boolean)
  async logout(@Ctx() { res }: AppContext) {
    sendRefreshToken(res, "");

    return true;
  }

  @Mutation(() => Boolean)
  async revokeRefreshTokensForUser(@Arg("userId") userId: string) {
    await getConnection()
      .getRepository(User)
      .increment({ id: userId }, "tokenVersion", 1);

    return true;
  }

  @Mutation(() => LoginResponse)
  async login(
    @Arg("email") email: string,
    @Arg("secret") secret: string,
    @Ctx() { res }: AppContext
  ): Promise<LoginResponse> {
    const user = await User.findOne({ where: { email } });
    const auth: any = await Auth.findOne({ where: { email } });

    if (!user) {
      throw new Error("could not find email");
    }

    if (secret !== auth.secret) {
      throw new Error("User found but that's not the magic word")
    }

    sendRefreshToken(res, createRefreshToken(user));

    await Auth.delete({ id: auth.id })

    return {
      accessToken: createAccessToken(user),
      user
    };
  }

  @Mutation(() => LoginResponse)
  async signup(
    @Arg("secret") secret: string,
    @Arg("email") email: string,
    @Arg("username") username: string,
    @Ctx() { res }: AppContext
  ): Promise<LoginResponse> {
    try {
      const auth: any = await Auth.findOne({ where: { email } })

      if (auth.secret !== secret) {
        console.log("secrets didnt match")
        throw new Error("Fake news")
      }

      const user = await User.create({
        email,
        username
      }).save();

      sendRefreshToken(res, createRefreshToken(user));
      if (process.env.NODE_ENV === 'production') {
        sendRefreshToken2(res, createRefreshToken(user))
      }

      await Auth.delete({ id: auth.id })

      return {
        accessToken: createAccessToken(user),
        user
      };

    } catch (err) {
      console.log(err);
      throw new Error("failed at catch")
    }
  }

  @Mutation(() => Boolean)
  async banUser(
    @Arg("id") id: string,
  ) {
    try {
      await User.delete({
        id: id
      })
    } catch (err) {
      console.log(err)
      return false
    }
    return true
  }
}