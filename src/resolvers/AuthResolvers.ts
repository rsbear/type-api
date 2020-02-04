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
import mailGunner from "../mailGunner";

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

      const securityWord = rword.generate(1, { length: 5 }).toString();
      const data = {
        token: securityWord,
        email: email
      };

      const subjectTitle = "typefeel Login";
      const content = `<div style="margin: 0 auto; max-width: 600px;">
            <h1 style="margin-bottom: 30px;">typefeel</h1>
          <h2>${data.token}</h2>
            <p style="font-size: 18px;">Login with your token by clicking the link below.</p>
            <a style="font-size: 16px; color: white; background-color: black; padding: 8px 16px; border-radius: 4px; text-decoration: none;" href="https://typefeel.com/auth/${encodeURIComponent(
        email
      )}&token=${data.token}">Log me in</a>
            <br />
            <br />
            <p style="font-size: 18px;">Cheers, typefeel</p>
          </div>
        `;

      await mailGunner(email, subjectTitle, content);

      await Auth.insert({
        email,
        secret: data.token
      })

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

      const securityWord = rword.generate(1, { length: 5 }).toString();
      const data = {
        token: securityWord,
        email: user.email
      };

      const subjectTitle = "typefeel Login";
      const content = `<div style="margin: 0 auto; max-width: 600px;">
            <h1 style="margin-bottom: 30px;">typefeel</h1>
          <h2>${data.token}</h2>
            <p style="font-size: 18px;">Login with your token by clicking the link below.</p>
            <a style="font-size: 16px; color: white; background-color: black; padding: 8px 16px; border-radius: 4px; text-decoration: none;" href="https://typefeel.com/auth/${encodeURIComponent(
        data.email
      )}&token=${data.token}">Log me in</a>
            <br />
            <br />
            <p style="font-size: 18px;">Cheers, typefeel</p>
          </div>
        `;

      await mailGunner(user.email, subjectTitle, content);

      await Auth.insert({
        email,
        secret: data.token
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