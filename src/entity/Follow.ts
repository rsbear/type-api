import { Entity, Column, BaseEntity, ManyToOne, JoinColumn, PrimaryColumn } from "typeorm";
import { ObjectType, Field, InputType } from "type-graphql";
import uniqid from 'uniqid'
import { User } from "./User";
import { Keyboard } from "./Keyboard";

@ObjectType()
@Entity("follows")
export class Follow extends BaseEntity {
  @Field(() => String)
  @PrimaryColumn("varchar", { default: `${uniqid("flw_")}` })
  id: string = uniqid("flw_")

  @Field({ nullable: true })
  @Column("text", { nullable: true })
  keyboardId: string

  @Field(() => String, { nullable: true })
  @Column("text", { nullable: true })
  keysetId: string

  @Field(() => Keyboard)
  @ManyToOne(() => Keyboard, keyboard => keyboard.follows)
  keyboard: Keyboard

  @ManyToOne(() => User, user => user.follows, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;
}

@InputType()
export class FollowInput implements Partial<Follow> {
  @Field({ nullable: true })
  keyboardId: string;

  @Field({ nullable: true })
  keysetId: string;
}