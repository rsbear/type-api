import { Resolver, Query, Mutation, Arg, UseMiddleware, Ctx } from "type-graphql";
import { Keyboard, KeyboardInput } from "../entity/Keyboard";
import { checkAuth } from "../checkAuth";
import { AppContext } from "../AppContext";
import { User } from "../entity/User";
import { SearchInput } from "../entity/SearchInput";
import { GraphQLUpload } from "graphql-upload";
import { processUploads } from "../uploader";
import { Edition } from "../entity/Edition";
import { SuccessResponse } from "../entity";


@Resolver()
export class KeyboardResolvers {
  @Query(() => [Keyboard])
  keyboards() {
    return Keyboard.find({ relations: ['editions', 'maker', 'joins'] })
  }

  @Query(() => Keyboard)
  keyboard(@Arg("shortId") shortId: string) {
    return Keyboard.findOne({
      where: { shortId },
      relations: ['editions', 'maker', 'posts', 'posts.user', 'joins'],
    })
  }

  @Query(() => Keyboard)
  async keyboardPosts(@Arg("shortId") shortId: string, @Arg("limit") limit: number) {
    try {
      let keyboard = await Keyboard.findOne({
        where: { shortId },
        relations: ['posts', 'posts.user'],
      })

      if (!keyboard) throw Error("Could not find keyboard")

      const { posts, ...rest } = keyboard
      const limitedPosts = keyboard.posts.slice(0, limit)


      return {
        ...rest,
        posts: limitedPosts
      }
    } catch (err) {
      console.log(err)
      throw Error("failed in keyboard posts catch block")
    }
  }

  @Query(() => [Keyboard])
  async sortKeyboards(
    @Arg("where") where: SearchInput
  ) {
    try {
      return Keyboard.find({ where: { ...where } })
    } catch (err) {
      console.log(err)
    }
  }

  @Mutation(() => SuccessResponse)
  @UseMiddleware(checkAuth)
  async makeKeyboard(
    @Ctx() { payload }: AppContext,
    @Arg("data", () => KeyboardInput) data: any,
    @Arg("images", () => [GraphQLUpload]) images: any,
  ): Promise<SuccessResponse> {
    try {
      const user = await User.findOne(payload!.userId);
      const { results600, results800, results1500, resultsRaw } = await processUploads(images)
      const keyboard = await Keyboard.create({
        ...data,
        maker: user,
        images600: results600,
        images800: results800,
        images1500: results1500,
        imagesRaw: resultsRaw,
      }).save()
      return {
        success: true,
        message: keyboard.shortId
      }
    } catch (err) {
      console.log(err)
      return {
        success: false,
        message: "something went wrong"
      }
    }
  };

  @Mutation(() => Boolean)
  async updateKeyboardStage(
    @Arg("id") id: string
  ) {
    await Keyboard.update(id, {
      interestCheck: false,
      market: true,
      groupBuy: false,
      groupBuySoon: false,
      closed: false
    })
    return true
  }

  @Mutation(() => Boolean)
  @UseMiddleware(checkAuth)
  async updateKeyboard(
    // @Ctx() { payload }: AppContext,
    @Arg("id") id: string,
    @Arg("data") data: KeyboardInput,
  ) {
    try {
      // const user = await User.findOne(payload!.userId);
      const { editions, ...rest } = data
      await Keyboard.update(id, {
        ...rest
      })

      for (let ed of data.editions) {
        const { id, shortId, ...rest } = ed
        await Edition.update(ed.id, {
          ...rest
        })
      }

      return true
    } catch (err) {
      console.log(err)
      return false
    }
  }

  @Mutation(() => Boolean)
  async keyboardAnnouncement(
    @Arg("id") id: string,
    @Arg("announcement") announcement: string
  ) {
    try {
      await Keyboard.update(id, {
        announcement
      })
      return true
    } catch (err) {
      console.log(err)
      return false
    }
  }

  @Mutation(() => Boolean)
  async deleteKeyboard(
    @Arg("id") id: string
  ) {
    if (id) {
      await Keyboard.delete({ id })
      return true
    }
    return false
  }
}