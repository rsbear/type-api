import { Entity, Column, BaseEntity, ManyToOne, JoinColumn, PrimaryColumn } from "typeorm";
import { ObjectType, Field, InputType } from "type-graphql";
import uniqid from 'uniqid'
import { User } from "./User";
import { Keyboard } from "./Keyboard";
import { Keyset } from "./Keyset";

@ObjectType()
@Entity("follows")
export class Follow extends BaseEntity {
  @Field(() => String)
  @PrimaryColumn("varchar", { default: `${uniqid("flw_")}` })
  id: string = uniqid("flw_")

  @Field({ nullable: true })
  @Column("text", { nullable: true })
  productId: string

  @Field(() => Keyboard, { nullable: true })
  @ManyToOne(() => Keyboard, keyboard => keyboard.follows)
  keyboard: Keyboard

  @Field(() => Keyset, { nullable: true })
  @ManyToOne(() => Keyset, keyset => keyset.follows)
  keyset: Keyset

  @ManyToOne(() => User, user => user.follows, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;
}

@InputType()
export class FollowInput implements Partial<Follow> {
  @Field({ nullable: true })
  productId: string;
}