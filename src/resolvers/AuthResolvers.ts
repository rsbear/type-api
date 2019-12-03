import {
  Resolver,
  Query,
  Mutation,
  Arg,
} from "type-graphql";
import { rword } from 'rword'
import { Auth } from "./../entity/Auth";

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

  @Mutation(() => Boolean)
  async generateAuth(
    @Arg("email") email: string,
  ) {
    try {
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