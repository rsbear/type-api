import { InputType, Field } from "type-graphql"


@InputType()
export class SearchInput {
  @Field({ nullable: true })
  interestCheck: boolean

  @Field({ nullable: true })
  market: boolean

  @Field({ nullable: true })
  groupBuy: boolean
}