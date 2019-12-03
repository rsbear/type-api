import { Resolver, Query, Mutation, Arg, UseMiddleware, Ctx } from "type-graphql";
import { JoinKeyboard, JoinKeyboardInput } from "../entity/JoinKeyboard";
import { Keyboard } from "../entity/Keyboard";
import { User } from "../entity/User";
import { checkAuth } from "../checkAuth";
import { AppContext } from "../AppContext";

@Resolver()
export class JoinKeyboardResolver {
  @Query(() => [JoinKeyboard])
  joinss() {
    return JoinKeyboard.find({ relations: ['keyboard'] })
  }

  @Mutation(() => Boolean)
  @UseMiddleware(checkAuth)
  async joinKeyboard(
    @Ctx() { payload }: AppContext,
    @Arg("id") id: string,
    @Arg("data", () => JoinKeyboardInput) data: JoinKeyboardInput,
  ) {
    try {
      const keyboard = await Keyboard.findOne({ id })
      const user = await User.findOne(payload!.userId)

      await JoinKeyboard.create({
        ...data,
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
  async deleteJoin(
    @Arg("id") id: string
  ) {
    await JoinKeyboard.delete(id)
    return true
  }
}