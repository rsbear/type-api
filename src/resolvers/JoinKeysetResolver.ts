import { Resolver, Query, Mutation, Arg, UseMiddleware, Ctx } from "type-graphql";
import { JoinKeyset, JoinKeysetInput } from "../entity/JoinKeyset";
import { Keyset } from "../entity/Keyset";
import { User } from "../entity/User";
import { checkAuth } from "../checkAuth";
import { AppContext } from "../AppContext";

@Resolver()
export class JoinKeysetResolver {
  @Query(() => [JoinKeyset])
  keysetJoins() {
    return JoinKeyset.find({ relations: ['keyset'] })
  }

  @Mutation(() => Boolean)
  @UseMiddleware(checkAuth)
  async joinKeyset(
    @Ctx() { payload }: AppContext,
    @Arg("id") id: string,
    @Arg("data", () => JoinKeysetInput) data: JoinKeysetInput,
  ) {
    try {
      const keyset = await Keyset.findOne({ id })
      const user = await User.findOne(payload!.userId)
      console.log(data)

      await JoinKeyset.insert({
        ...data,
        keysetId: id,
        keyset,
        user
      })

      return true
    } catch (err) {
      console.log(err)
      return false
    }
  }

  @Mutation(() => Boolean)
  async deleteJoinKeyset(
    @Arg("id") id: string
  ) {
    await JoinKeyset.delete(id)
    return true
  }
}