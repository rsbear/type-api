import { Resolver, Query, Mutation, Arg, UseMiddleware, Ctx } from "type-graphql";
import { Keyboard } from "../entity/Keyboard";
import { Keyset } from "../entity/Keyset";
import { User } from "../entity/User";
import { Follow } from "../entity/Follow";
import { checkAuth } from "../checkAuth";
import { AppContext } from "../AppContext";

@Resolver()
export class FollowResolvers {
  @Query(() => [Follow])
  follows() {
    return Follow.find({ relations: ['keyboard', 'keyset'] })
  }

  @Mutation(() => Boolean)
  @UseMiddleware(checkAuth)
  async createFollow(
    @Ctx() { payload }: AppContext,
    @Arg("id") id: string,
  ) {
    try {
      const user = await User.findOne(payload!.userId)
      console.log(id)

      if (id.includes("kb_")) {
        const keyboard = await Keyboard.findOne({ id })
        await Follow.insert({
          productId: id,
          keyboard,
          user
        })
        return true
      }

      if (id.includes("set_")) {
        const keyset = await Keyset.findOne({ id })
        await Follow.insert({
          productId: id,
          keyset,
          user
        })
        return true
      }

    } catch (err) {
      console.log(err)
      return false
    }
  }

  // potentially deprecating individual follow mutations
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
        productId: id,
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
  @UseMiddleware(checkAuth)
  async followKeyset(
    @Ctx() { payload }: AppContext,
    @Arg("id") id: string,
  ) {
    try {
      const keyset = await Keyset.findOne({ id })
      const user = await User.findOne(payload!.userId)

      await Follow.create({
        productId: id,
        keyset,
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
  async followKeysetDelete(
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