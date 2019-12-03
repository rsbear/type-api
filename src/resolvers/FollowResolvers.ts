import { Resolver, Query, Mutation, Arg, UseMiddleware, Ctx } from "type-graphql";
import { Keyboard } from "../entity/Keyboard";
import { User } from "../entity/User";
import { Follow } from "../entity/Follow";
import { checkAuth } from "../checkAuth";
import { AppContext } from "../AppContext";

@Resolver()
export class FollowResolvers {
  @Query(() => [Follow])
  follows() {
    return Follow.find({ relations: ['keyboard'] })
  }

  @Mutation(() => Boolean)
  @UseMiddleware(checkAuth)
  async followKeyboard(
    @Ctx() { payload }: AppContext,
    @Arg("id") id: string,
  ) {
    try {
      const keyboard = await Keyboard.findOne({ id })
      const user = await User.findOne(payload!.userId)

      await Follow.create({
        keyboardId: id,
        keyboard,
        user
      }).save()

      return true
    } catch (err) {
      console.log(err)
      return false
    }
  }

  @Mutation(() => Boolean)
  @UseMiddleware(checkAuth)
  async followKeyboardDelete(
    @Ctx() { payload }: AppContext,
    @Arg("id") id: string,
  ) {
    try {
      const user = await User.findOne(payload!.userId)
      if (!user) {
        return false
      }
      await Follow.delete({ id })
      return true
    } catch (err) {
      console.log(err)
      return false
    }
  }

  @Mutation(() => Boolean)
  async deleteFollow(
    @Arg("id") id: string
  ) {
    await Follow.delete({ id })
    return true
  }
}