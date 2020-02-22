import { Resolver, Query, Mutation, Arg, UseMiddleware, Ctx } from "type-graphql";
import { checkAuth } from "../checkAuth";
import { AppContext } from "../AppContext";
import { GraphQLUpload } from "graphql-upload";
import { processUploads } from "../uploader";

import { SearchInput } from "../entity/SearchInput";
import { User } from "../entity/User";
import { Keyset, KeysetInput } from "../entity/Keyset";
import { Kit, Color, SuccessResponse } from "../entity";
// import { getConnection } from "typeorm";
// import { Kit } from "../entity";

@Resolver()
export class KeysetResolvers {
  @Query(() => [Keyset])
  keysets() {
    return Keyset.find({ relations: ['kits', 'maker', 'colors'] })
  }

  // 'posts.user' in relationships
  @Query(() => Keyset)
  keyset(@Arg("shortId") shortId: string) {
    return Keyset.findOne({
      where: { shortId },
      relations: [
        'kits',
        'maker',
        'colors',
        'joins',
        'posts',
        'posts.user'
      ],
    })
  }

  @Query(() => [Keyset])
  async sortKeysets(
    @Arg("where") where: SearchInput
  ) {
    try {
      return Keyset.find({ where: { ...where } })
    } catch (err) {
      console.log(err)
    }
  }

  @Mutation(() => SuccessResponse)
  @UseMiddleware(checkAuth)
  async makeKeyset(
    @Ctx() { payload }: AppContext,
    @Arg("data", () => KeysetInput) data: any,
    @Arg("images", () => [GraphQLUpload]) images: any,
  ): Promise<SuccessResponse> {
    try {
      const user = await User.findOne(payload!.userId);
      const { results600, results800, results1500, resultsRaw } = await processUploads(images)
      const keyset = await Keyset.create({
        ...data,
        maker: user,
        images600: results600,
        images800: results800,
        images1500: results1500,
        imagesRaw: resultsRaw,
      }).save()
      return {
        success: true,
        message: keyset.shortId
      }
    } catch (err) {
      console.log(err)
      return {
        success: false,
        message: "Something went wrong"
      }
    }
  };

  @Mutation(() => Boolean)
  @UseMiddleware(checkAuth)
  async updateKeyset(
    @Arg("id") id: string,
    @Arg("data") data: KeysetInput
  ) {
    try {
      const { kits, colors, ...rest } = data
      const keyset = await Keyset.findOne({ where: { id }, relations: ['kits', 'colors'] })
      if (!keyset) throw new Error("Failed")

      for (let k of keyset.kits) {
        await Kit.delete(k)
      }
      for (let k of data.kits) {
        const newKit = await Kit.create(k).save()
        keyset.kits.push(newKit)
      }
      for (let c of keyset.colors) {
        await Color.delete(c)
      }
      for (let c of data.colors) {
        const newColor = await Color.create(c).save()
        keyset.colors.push(newColor)
      }
      keyset.save()

      await Keyset.update(id, {
        ...rest,
      })
      return true
    } catch (err) {
      console.log(err)
      return false
    }
  }

  @Mutation(() => Boolean)
  async updateKeysetStage(
    @Arg("id") id: string
  ) {
    await Keyset.update(id, {
      interestCheck: false,
      market: true,
      groupBuy: false,
      groupBuySoon: false,
      closed: false
    })
    return true
  }

  @Mutation(() => Boolean)
  async deleteKeyset(
    @Arg("id") id: string
  ) {
    if (id) {
      await Keyset.delete({ id })
      return true
    }
    return false
  }

  @Query(() => [Kit])
  async kits() {
    return Kit.find({ relations: ['keyset'] })
  }

  @Mutation(() => Boolean)
  async deleteKit(
    @Arg("id") id: string
  ) {
    try {
      await Kit.delete({ id })
      return true
    } catch (err) {
      console.log(err)
    }
  }
}