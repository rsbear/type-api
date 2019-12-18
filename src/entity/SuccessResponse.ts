import { ObjectType, Field } from "type-graphql"

@ObjectType()
export class SuccessResponse {
  @Field(() => Boolean)
  success: boolean

  @Field(() => String, { nullable: true })
  message: string
}