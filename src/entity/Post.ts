import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { ObjectType, Field } from "type-graphql";
import { Keyboard } from "./Keyboard";
import { Keyset } from "./Keyset";
import { User } from "./User";

@ObjectType()
@Entity("posts")
export class Post extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column("text")
  body: string;

  @Field()
  @Column()
  @CreateDateColumn()
  created: Date

  @ManyToOne(() => Keyboard, keyboard => keyboard.posts, { nullable: true, onDelete: 'CASCADE' })
  @JoinColumn()
  keyboard: Keyboard;

  @ManyToOne(() => Keyset, keyset => keyset.posts, { nullable: true, onDelete: 'CASCADE' })
  @JoinColumn()
  keyset: Keyset;

  @Field(() => User)
  @ManyToOne(() => User)
  @JoinColumn()
  user: User

}