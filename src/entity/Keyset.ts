import { ObjectType, Field, InputType } from "type-graphql";
import { Entity, BaseEntity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import uniqid from 'uniqid'
import shortid from 'shortid'
import { User } from "./User";
import { Kit, KitInput } from "./Kit";
import { Follow } from './Follow'
import { Color, ColorInput } from "./Color";


@ObjectType()
@Entity("keysets")
export class Keyset extends BaseEntity {

  // IDs
  @Field()
  @PrimaryColumn("varchar", { default: `${uniqid("set_")}` })
  id: string = uniqid("set_");

  @Field()
  @Column("varchar", { default: `${shortid.generate()}` })
  shortId: string = shortid.generate()

  @Field()
  @Column("text")
  name: string

  @Field()
  @Column("text")
  profile: string

  @Field()
  @Column("text")
  stem: string

  @Field(() => [Kit], { nullable: true })
  @OneToMany(() => Kit, kit => kit.keyset, { cascade: true, onDelete: "CASCADE" })
  kits: Kit[]

  @Field(() => [Color], { nullable: true })
  @OneToMany(() => Color, color => color.keyset, { cascade: true, onDelete: "CASCADE" })
  colors: Color[]

  // IMGS
  @Field(() => [String], { nullable: true })
  @Column("simple-array", { nullable: true })
  images600: string[]

  @Field(() => [String], { nullable: true })
  @Column("simple-array", { nullable: true })
  images800: string[]

  @Field(() => [String], { nullable: true })
  @Column("simple-array", { nullable: true })
  images1500: string[]

  @Field(() => [String], { nullable: true })
  @Column("simple-array", { nullable: true })
  imagesRaw: string[]

  @Field(() => [String], { nullable: true })
  @Column("simple-array", { nullable: true })
  details: string[]


  // DATES
  @Field()
  @Column()
  @CreateDateColumn()
  created: Date = new Date

  @Field()
  @Column()
  @UpdateDateColumn()
  updated: Date = new Date

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, user => user.keyboards)
  @JoinColumn()
  maker: User

  // STAGES
  @Field({ nullable: true })
  @Column("boolean", { nullable: true })
  interestCheck: boolean

  @Field({ nullable: true })
  @Column("boolean", { nullable: true })
  market: boolean

  @Field({ nullable: true })
  @Column("boolean", { nullable: true })
  groupBuy: boolean

  @Field({ nullable: true })
  @Column("boolean", { nullable: true })
  groupBuySoon: boolean

  @Field({ nullable: true })
  @Column("boolean", { nullable: true })
  closed: boolean

  @OneToMany(() => Follow, follow => follow.keyset)
  follows: Follow
}

@InputType()
export class KeysetInput implements Partial<Keyset> {
  @Field()
  name: string

  @Field()
  profile: string

  @Field()
  stem: string

  @Field(() => KitInput)
  kits: Kit[]

  @Field(() => ColorInput)
  colors: Color[]

  @Field(() => [String])
  details: string[]

  @Field(() => Boolean, { nullable: true })
  interestCheck: boolean

  @Field(() => Boolean, { nullable: true })
  groupBuy: boolean

  @Field(() => Boolean, { nullable: true })
  groupBuySoon: boolean

  @Field(() => Boolean, { nullable: true })
  market: boolean

  @Field(() => Boolean, { nullable: true })
  closed: boolean
}