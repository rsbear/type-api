import {
  Resolver,
  Query,
  Mutation,
  Arg,
} from "type-graphql";
import { rword } from 'rword'
import { Auth } from "./../entity/Auth";
import { User } from "./../entity/User";
import { SuccessResponse } from "./../entity/SuccessResponse";

// @ObjectType()
// class LoginResponse {
//   @Field()
//   accessToken: string;
//   @Field(() => User)
//   user: User;
// }



@Resolver()
export class AuthResolvers {
  @Query(() => [Auth])
  auths() {
    return Auth.find()
  }

  @Mutation(() => SuccessResponse)
  async generateSignupAuth(
    @Arg("email") email: string,
    @Arg("username") username: string
  ) {
    try {
      const userEmail = await User.findOne({ where: { email } });
      const userUsername = await User.findOne({ where: { username } });

      if (userEmail) {
        return {
          success: false,
          message: 'Email already in use.'
        }
      }

      if (userUsername) {
        return {
          success: false,
          message: 'Username taken, try a different one.'
        }
      }

      await Auth.insert({
        email,
        secret: rword.generate(1, { length: 5 }).toString()
      });

    } catch (err) {
      console.log(err);
      return {
        success: false,
        message: 'Something went wrong.'
      }
    }

    return {
      success: true,
      message: "Sign up auth ticket successfully created."
    }
  }


  @Mutation(() => Boolean)
  async generateAuth(
    @Arg("email") email: string,
  ) {
    try {
      const user = await User.findOne({ where: { email } });

      if (!user) {
        throw new Error("Invalid email")
      }

      if (email) {
        await Auth.delete({ email: email })
      }

      await Auth.insert({
        email,
        secret: rword.generate(1, { length: 5 }).toString()
      });

    } catch (err) {
      console.log(err);
      return false;
    }
    return true;
  }


  @Mutation(() => Boolean)
  async deleteAuth(
    @Arg("id") id: string,
  ) {
    try {
      await Auth.delete({
        id: id
      })
    } catch (err) {
      console.log(err)
      return false
    }
    return true
  }
}