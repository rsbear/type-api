import { Entity, Column, BaseEntity, CreateDateColumn, ManyToOne, JoinColumn, PrimaryColumn } from "typeorm";
import { ObjectType, Field, InputType } from "type-graphql";
import { Keyboard } from "./Keyboard";
import uniqid from 'uniqid'
import { User } from "./User";

@ObjectType()
@Entity("joinkeyboards")
export class JoinKeyboard extends BaseEntity {
  @Field()
  @PrimaryColumn("varchar", { default: `${uniqid("join_")}` })
  id: string = uniqid("join_");

  @Field()
  @Column("text")
  keyboardId: string;

  @Field()
  @Column("text")
  caseChoice: string;

  @Field()
  @Column("text")
  plateChoice: string;

  @Field()
  @Column()
  layoutChoice: string;

  @Field()
  @Column()
  @CreateDateColumn()
  created: Date

  // @Field(() => Keyboard)
  // @ManyToOne(() => Keyboard, keyboard => keyboard.joins, { onDelete: 'CASCADE' })
  // @JoinColumn()
  // keyboard: Keyboard;

  @Field(() => Keyboard, { nullable: true })
  @ManyToOne(() => Keyboard, keyboard => keyboard.joins)
  @JoinColumn()
  keyboard: Keyboard

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, user => user.keyboardjoins)
  @JoinColumn()
  user: User

}

@InputType()
export class JoinKeyboardInput implements Partial<JoinKeyboard> {

  @Field()
  caseChoice: string;

  @Field()
  plateChoice: string;

  @Field()
  layoutChoice: string;

}