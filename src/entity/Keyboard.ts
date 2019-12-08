import { Entity, Column, BaseEntity, CreateDateColumn, UpdateDateColumn, PrimaryColumn, OneToMany, JoinColumn, ManyToOne, } from "typeorm";
import { ObjectType, Field, InputType } from "type-graphql";
import { User } from './User'
import { Edition, EditionInput, } from "./Edition";
import { JoinKeyboard } from './JoinKeyboard'
import { Post } from './Post'
import { Follow } from "./Follow";
import shortid from 'shortid'
import uniqid from 'uniqid'



@ObjectType()
@Entity("keyboards")
export class Keyboard extends BaseEntity {

  @Field({ nullable: true })
  @Column("text")
  angle: string

  @Field({ nullable: true })
  @Column("text", { nullable: true })
  announcement: string;

  @Field({ nullable: true })
  @Column("text")
  brand: string

  @Field({ nullable: true })
  @Column("text")
  connector: string

  @Field(() => [String], { nullable: true })
  @Column("simple-array")
  details: string[]


  @Field(() => [Edition], { nullable: true })
  @OneToMany(() => Edition, edition => edition.keyboard, { cascade: true, onDelete: "CASCADE" })
  editions: Edition[]



  @Field({ nullable: true })
  @Column("text")
  firmware: string


  @Field({ nullable: true })
  @Column("text")
  mount: string

  @Field(() => [String], { nullable: true })
  @Column("simple-array")
  layouts: string[]

  @Field({ nullable: true })
  @Column("text")
  pcb: string

  @Field({ nullable: true })
  @Column("text")
  name: string

  @Field({ nullable: true })
  @Column("text")
  size: string

  @Field(() => [String], { nullable: true })
  @Column("simple-array")
  support: string[]

  // ids
  @Field()
  @PrimaryColumn("varchar", { default: `${uniqid("kb_")}` })
  id: string = uniqid("kb_")

  @Field()
  @Column('varchar', { default: `${shortid.generate()}` })
  shortId: string = shortid.generate().toString()

  //images
  @Field(() => [String], { nullable: true })
  @Column("simple-array")
  images600: string[]

  @Field(() => [String], { nullable: true })
  @Column("simple-array")
  images800: string[]

  @Field(() => [String], { nullable: true })
  @Column("simple-array")
  images1500: string[]

  @Field(() => [String], { nullable: true })
  @Column("simple-array")
  imagesRaw: string[]


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

  // RELATIONS

  @Field(() => [JoinKeyboard], { nullable: true })
  @OneToMany(() => JoinKeyboard, joinkeyboard => joinkeyboard.keyboard, { onDelete: "CASCADE" })
  joins: JoinKeyboard[]


  @Field(() => [Post], { nullable: true })
  @OneToMany(() => Post, post => post.keyboard, { onDelete: "CASCADE" })
  posts: Post[]

  @OneToMany(() => Follow, follow => follow.keyboard)
  follows: Follow
}



// INPUT
@InputType()
export class KeyboardInput implements Partial<Keyboard> {

  @Field({ nullable: true })
  angle: string

  @Field({ nullable: true })
  brand: string

  @Field({ nullable: true })
  connector: string

  @Field(() => [String], { nullable: true })
  details: string[]

  @Field(() => EditionInput, { nullable: true })
  editions: Edition[]

  @Field({ nullable: true })
  firmware: string

  @Field({ nullable: true })
  mount: string

  @Field(() => [String], { nullable: true })
  layouts: string[]

  @Field({ nullable: true })
  pcb: string

  @Field({ nullable: true })
  name: string

  @Field({ nullable: true })
  size: string

  @Field(() => [String], { nullable: true })
  support: string[]



  // // DATES
  // @Field()
  // @Column()
  // @CreateDateColumn()
  // created: Date

  // @Field()
  // @Column()
  // @UpdateDateColumn()
  // updated: Date

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
