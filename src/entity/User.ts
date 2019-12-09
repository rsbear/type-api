import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from "typeorm";
import { ObjectType, Field, } from "type-graphql";
import { Keyboard } from "./Keyboard";
import { Vote } from "./Vote";
import { JoinKeyboard } from "./JoinKeyboard";
import { JoinKeyset } from "./JoinKeyset";
import { Follow } from "./Follow";

@ObjectType()
@Entity("users")
export class User extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Field()
  @Column("text")
  email: string;

  @Field()
  @Column("text")
  username: string;

  @Column("int", { default: 0 })
  tokenVersion: number;

  @OneToMany(() => Keyboard, keyboard => keyboard.maker)
  @Field(() => [Keyboard])
  keyboards: Keyboard[]

  @Field(() => [Vote])
  @OneToMany(() => Vote, vote => vote.user)
  votes: Vote[]

  @Field(() => [Follow])
  @OneToMany(() => Follow, follow => follow.user)
  follows: Follow

  @Field(() => [JoinKeyboard])
  @OneToMany(() => JoinKeyboard, joinkb => joinkb.user)
  keyboardjoins: JoinKeyboard[]

  @Field(() => [JoinKeyset])
  @OneToMany(() => JoinKeyset, joinset => joinset.user)
  keysetjoins: JoinKeyset[]
}