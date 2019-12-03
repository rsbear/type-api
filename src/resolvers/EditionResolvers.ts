import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { Edition, } from "../entity/Edition";

@Resolver()
export class EditionResolvers {
  @Query(() => [Edition])
  editions() {
    return Edition.find()
  }

  @Mutation(() => Boolean)
  async deleteEdition(
    @Arg("id") id: string
  ) {
    try {
      await Edition.delete({ id })
      return true
    } catch (err) {
      console.log(err)
      return false
    }
  }
}