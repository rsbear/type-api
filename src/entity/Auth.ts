import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn } from "typeorm";
import { ObjectType, Field } from "type-graphql";

@ObjectType()
@Entity("auths")
export class Auth extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column("text")
  email: string;

  @Field()
  @PrimaryGeneratedColumn("uuid")
  token: string;

  @Field()
  @Column()
  secret: string;

  @Field()
  @Column()
  @CreateDateColumn()
  created: Date

  @Column("int", { default: 0 })
  tokenVersion: number;
}