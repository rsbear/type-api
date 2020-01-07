import { Entity, Column, BaseEntity, ManyToOne, JoinColumn, PrimaryColumn } from "typeorm";
import { ObjectType, Field, InputType, Int } from "type-graphql";
import shortid from 'shortid'
import uniqid from 'uniqid'
import { Keyboard } from "./Keyboard";

@ObjectType()
@Entity("editions")
export class Edition extends BaseEntity {
  @Field(() => String)
  @PrimaryColumn("varchar", { default: `${uniqid("ed_")}` })
  id: string = uniqid("ed_")

  @Field(() => String)
  @Column("varchar", { default: `${shortid.generate()}` })
  shortId: string = shortid.generate().toString();

  @Field({ nullable: true })
  @Column("text", { nullable: true })
  name: string

  @Field(() => Int, { nullable: true })
  @Column("int")
  price: number;

  @Field(() => Int, { nullable: true })
  @Column("int", { nullable: true })
  suggestedPrice: number;

  @Field(() => [String], { nullable: true })
  @Column("simple-array")
  cases: string[]

  @Field(() => [String], { nullable: true })
  @Column("simple-array")
  colors: string[]

  @Field(() => [String], { nullable: true })
  @Column("simple-array")
  plates: string[]

  // @Field(() => [String], { nullable: true })
  // @Column("simple-array")
  // weights: string[]

  // @Column({ nullable: true })
  // keyboardId: string;
  @ManyToOne(() => Keyboard, keyboard => keyboard.editions, { onDelete: 'CASCADE' })
  @JoinColumn()
  keyboard: Keyboard;
}

@InputType()
export class EditionInput implements Partial<Edition> {
  @Field({ nullable: true })
  id: string;

  @Field({ nullable: true })
  name: string;

  @Field(() => Int, { nullable: true })
  price: number;

  @Field(() => Int, { nullable: true })
  suggestedPrice: number;

  @Field(() => [String], { nullable: true })
  cases: string[]

  @Field(() => [String], { nullable: true })
  colors: string[]

  @Field(() => [String], { nullable: true })
  plates: string[]

  // @Field(() => [String])
  // weights: string[]
}