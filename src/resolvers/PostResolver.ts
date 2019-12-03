import { Resolver, Query, Mutation, Arg, UseMiddleware, Ctx } from "type-graphql";
import { checkAuth } from "../checkAuth";
import { AppContext } from "../AppContext";
import { Keyboard } from "../entity/Keyboard";
import { User } from "../entity/User";
import { Post } from '../entity/Post'

@Resolver()
export class PostResolver {
  @Query(() => [Post])
  postss() {
    return Post.find({ relations: ['keyboard', 'user'] })
  }

  @Mutation(() => Boolean)
  @UseMiddleware(checkAuth)
  async createPost(
    @Ctx() { payload }: AppContext,
    @Arg("id") id: string,
    @Arg("body") body: string,
  ) {
    try {
      const keyboard = await Keyboard.findOne({ id })
      const user = await User.findOne(payload!.userId)

      if (!user) {
        return false
      }

      await Post.insert({
        body,
        keyboard,
        user
      })

      return true
    } catch (err) {
      console.log(err)
      return false
    }
  }

  @Mutation(() => Boolean)
  async deletePost(
    @Arg("id") id: string
  ) {
    await Post.delete(id)
    return true
  }
}