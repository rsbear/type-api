import { Resolver, Query, Mutation, Arg, UseMiddleware, Ctx, ObjectType, Field } from "type-graphql";
import { Keyboard } from "../entity/Keyboard";
import { Keyset } from "../entity/Keyset";
import { User } from "../entity/User";
import { Follow } from "../entity/Follow";
import { checkAuth } from "../checkAuth";
import { AppContext } from "../AppContext";


@ObjectType()
class FollowResponse {
  @Field()
  success: boolean;
  @Field(() => String)
  id: string;
}

@Resolver()
export class FollowResolvers {
  @Query(() => [Follow])
  follows() {
    return Follow.find({ relations: ['keyboard', 'keyset'] })
  }

  @Mutation(() => FollowResponse)
  @UseMiddleware(checkAuth)
  async createFollow(
    @Ctx() { payload }: AppContext,
    @Arg("id") id: string,
  ) {
    try {
      const user = await User.findOne(payload!.userId)

      if (id.includes("kb_")) {
        const keyboard = await Keyboard.findOne({ id })
        const follow = await Follow.create({
          productId: id,
          keyboard,
          user
        }).save()
        return {
          success: true,
          id: follow.id
        }
      }

      if (id.includes("set_")) {
        const keyset = await Keyset.findOne({ id })
        const follow = await Follow.create({
          productId: id,
          keyset,
          user
        }).save()
        return {
          success: true,
          id: follow.id
        }
      }

    } catch (err) {
      console.log(err)
      throw new Error("something went wrong")
    }
  }

  @Mutation(() => Boolean)
  @UseMiddleware(checkAuth)
  async unfollow(
    @Arg("id") id: string,
    @Ctx() { payload }: AppContext
  ) {
    try {
      const user = await User.findOne(payload!.userId)
      if (!user) throw new Error("Log in")

      await Follow.delete({ id })

    } catch (err) {
      console.log(err)
      return false
    }

    return true
  }

  @Mutation(() => Boolean)
  async deleteFollow(
    @Arg("id") id: string
  ) {
    await Follow.delete({ id })
    return true
  }
}