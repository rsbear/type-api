import { Entity, Column, BaseEntity, CreateDateColumn, ManyToOne, JoinColumn, PrimaryColumn } from "typeorm";
import { ObjectType, Field, InputType } from "type-graphql";
import uniqid from 'uniqid'
import { User } from "./User";
import { Keyset } from "./Keyset";

@ObjectType()
@Entity("joinkeysets")
export class JoinKeyset extends BaseEntity {
  @Field()
  @PrimaryColumn({ default: `${uniqid("join_")}` })
  id: string = uniqid("join_");

  @Field()
  @Column("text")
  keysetId: string;

  @Field(() => [String], { nullable: true })
  @Column("simple-array", { nullable: true })
  kits: string[];

  @Field()
  @Column()
  @CreateDateColumn()
  created: Date

  @Field(() => Keyset, { nullable: true })
  @ManyToOne(() => Keyset, keyset => keyset.joins)
  @JoinColumn()
  keyset: Keyset

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, user => user.keysetjoins)
  @JoinColumn()
  user: User

}

@InputType()
export class JoinKeysetInput implements Partial<JoinKeyset> {
  @Field(() => [String], { nullable: true })
  kits: string[]
}