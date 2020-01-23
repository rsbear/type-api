import { Resolver, Query, Mutation, Arg, UseMiddleware, Ctx } from "type-graphql";
import { Edition } from "../entity/Edition";
import { Vote } from "../entity/Vote";
import { checkAuth } from "../checkAuth";
import { AppContext } from "../AppContext";
import { User } from "../entity/User";

import dayjs from 'dayjs'
import { Kit } from "../entity";

@Resolver()
export class VoteResolvers {
  @Query(() => [Vote])
  votes() {
    return Vote.find()
  }

  @Mutation(() => Boolean)
  @UseMiddleware(checkAuth)
  async voteKeyboardUp(
    @Ctx() { payload }: AppContext,
    @Arg("id") id: string
  ) {
    try {
      const user = await User.findOne(payload!.userId, { relations: ['votes'] });
      const edition = await Edition.findOne(id)

      if (!user || !edition) { return false }

      const userVotes = user.votes.map((v: any) => v.editionId)
      if (userVotes.includes(id)) {
        console.log(`User votes includes editionId`)
        const vote: any = await Vote.findOne({ where: { editionId: id } })
        const voteExp = dayjs(vote.expiration)
        const nowDate = dayjs(new Date)

        if (voteExp.isAfter(nowDate)) {
          console.log(`TOO EARLY`)
          throw new Error('Voted already, try again in 5 days')
        }
        console.log(`DELETING existing vote`)
        await Vote.delete({ id: vote.id })
      }

      // make new vote
      await Vote.insert({
        editionId: id,
        user
      });
      const newPrice = edition.suggestedPrice === null ?
        Math.trunc(edition.price + (edition.price * .03))
        : Math.trunc(edition.suggestedPrice + (edition.suggestedPrice * .03))
      await Edition.update(id, { suggestedPrice: newPrice })

      return true
    } catch (err) {
      console.log(err)
      return false
    }
  }

  @Mutation(() => Boolean)
  @UseMiddleware(checkAuth)
  async voteKeyboardDown(
    @Ctx() { payload }: AppContext,
    @Arg("id") id: string
  ) {
    try {
      const user = await User.findOne(payload!.userId, { relations: ['votes'] });
      const edition = await Edition.findOne(id)

      if (!user || !edition) { return false }

      const userVotes = user.votes.map((v: any) => v.editionId)
      if (userVotes.includes(id)) {
        console.log(`User votes includes editionId`)
        const vote: any = await Vote.findOne({ where: { editionId: id } })
        const voteExp = dayjs(vote.expiration)
        const nowDate = dayjs(new Date)

        console.log(`vote exp ${voteExp}`)
        console.log(`now time ${nowDate}`)

        if (voteExp.isAfter(nowDate)) {
          console.log(`TOO EARLY`)
          throw new Error('Voted already, try again in 5 days')
        }
        console.log(`DELETING existing vote`)
        await Vote.delete({ id: vote.id })
      }

      console.log(`Making new vote`)
      await Vote.create({
        editionId: id,
        user
      }).save()
      const newPrice = edition.suggestedPrice === null ?
        Math.trunc(edition.price - (edition.price * .015))
        : Math.trunc(edition.suggestedPrice - (edition.suggestedPrice * .015))
      await Edition.update(id, { suggestedPrice: newPrice })

      return true
    } catch (err) {
      console.log(err)
      return false
    }
  }

  @Mutation(() => Boolean)
  @UseMiddleware(checkAuth)
  async voteKitUp(
    @Ctx() { payload }: AppContext,
    @Arg("id") id: string
  ) {
    try {
      const user = await User.findOne(payload!.userId, { relations: ['votes'] });
      const kit = await Kit.findOne(id)

      if (!user || !kit) { return false }

      const userVotes = user.votes.map((v: any) => v.kitId)
      if (userVotes.includes(id)) {
        console.log(`User votes includes kitId`)
        const vote: any = await Vote.findOne({ where: { setId: id } })
        const voteExp = dayjs(vote.expiration)
        const nowDate = dayjs(new Date)

        if (voteExp.isAfter(nowDate)) {
          console.log(`TOO EARLY`)
          throw new Error('Voted already, try again in 5 days')
        }
        console.log(`DELETING existing vote`)
        await Vote.delete({ id: vote.id })
      }

      // make new vote
      await Vote.insert({
        kitId: id,
        user
      });
      const newPrice = kit.suggestedPrice !== null ?
        Math.trunc(kit.suggestedPrice + (kit.suggestedPrice * .03))
        : Math.trunc(kit.price + (kit.price * .03))
      console.log(newPrice)
      await Kit.update(id, { suggestedPrice: newPrice })

      return true
    } catch (err) {
      console.log(err)
      return false
    }
  }

  @Mutation(() => Boolean)
  @UseMiddleware(checkAuth)
  async voteKitDown(
    @Ctx() { payload }: AppContext,
    @Arg("id") id: string
  ) {
    try {
      const user = await User.findOne(payload!.userId, { relations: ['votes'] });
      const kit = await Kit.findOne(id)

      if (!user || !kit) { return false }

      const userVotes = user.votes.map((v: any) => v.kitId)
      if (userVotes.includes(id)) {
        console.log(`User votes includes editionId`)
        const vote: any = await Vote.findOne({ where: { kitId: id } })
        const voteExp = dayjs(vote.expiration)
        const nowDate = dayjs(new Date)

        console.log(`vote exp ${voteExp}`)
        console.log(`now time ${nowDate}`)

        if (voteExp.isAfter(nowDate)) {
          console.log(`TOO EARLY`)
          throw new Error('Voted already, try again in 5 days')
        }
        console.log(`DELETING existing vote`)
        await Vote.delete({ id: vote.id })
      }

      console.log(`Making new vote`)
      await Vote.insert({
        kitId: id,
        user
      })
      const newPrice = kit.suggestedPrice !== null ?
        Math.trunc(kit.suggestedPrice - (kit.suggestedPrice * .015))
        : Math.trunc(kit.price - (kit.price * .015))
      console.log(newPrice)
      await Kit.update(id, { suggestedPrice: null })

      return true
    } catch (err) {
      console.log(err)
      return false
    }
  }

  @Mutation(() => Boolean)
  async deleteVote(
    @Arg("id") id: string
  ) {
    try {
      await Vote.delete({ id })
      return true
    } catch (err) {
      console.log(err)
      return false
    }
  }
}