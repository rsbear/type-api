import { Entity, Column, BaseEntity, CreateDateColumn, PrimaryColumn, ManyToOne, JoinColumn } from "typeorm";
import { ObjectType, Field } from "type-graphql";
import uniqid from 'uniqid'
import { User } from "./User";
import dayjs from "dayjs";

@ObjectType()
@Entity("votes")
export class Vote extends BaseEntity {
  @Field()
  @PrimaryColumn("varchar", { default: `${uniqid("vote_")}` })
  id: string = uniqid("vote_");

  @Field({ nullable: true })
  @Column("text", { nullable: true })
  editionId: string;

  @Field({ nullable: true })
  @Column("text", { nullable: true })
  kitId: string;

  @Field()
  @Column()
  @CreateDateColumn()
  created: Date

  // @Field(() => String, { nullable: true })
  // @Column("date", { nullable: true })
  // expiration: Dayjs;

  @Field({ nullable: true })
  @Column({ default: `${dayjs().add(2, 'minute')} ` })
  expiration: string = dayjs().add(2, 'minute').format()

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, user => user.votes)
  @JoinColumn()
  user: User
}