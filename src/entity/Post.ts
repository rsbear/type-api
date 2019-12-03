import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { ObjectType, Field } from "type-graphql";
import { Keyboard } from "./Keyboard";
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

  @ManyToOne(() => Keyboard, keyboard => keyboard.posts, { onDelete: 'CASCADE' })
  @JoinColumn()
  keyboard: Keyboard;

  @Field(() => User)
  @ManyToOne(() => User)
  @JoinColumn()
  user: User


  // @ManyToOne(() => Keyset, keyset => keyset.posts, { onDelete: 'CASCADE' })
  // @JoinColumn()
  // keyset: Keyset;
}