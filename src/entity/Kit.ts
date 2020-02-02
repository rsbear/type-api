
import { Entity, Column, BaseEntity, ManyToOne, JoinColumn, PrimaryColumn } from "typeorm";
import { ObjectType, Field, InputType, Int } from "type-graphql";
import uniqid from 'uniqid'
import { Keyset } from "./Keyset";

@ObjectType()
@Entity("kits")
export class Kit extends BaseEntity {
  @Field(() => String)
  @PrimaryColumn("varchar", { default: `${uniqid("kit_")}` })
  id: string = uniqid("kit_")

  @Field({ nullable: true })
  @Column("text", { nullable: true })
  kit: string

  @Field(() => Int, { nullable: true })
  @Column("int")
  price: number;

  @Field(() => Int, { nullable: true })
  @Column("int", { nullable: true })
  suggestedPrice: number | null;

  @Field(() => String, { nullable: true })
  @Column("text")
  name: string

  @ManyToOne(() => Keyset, keyset => keyset.kits, { cascade: true })
  @JoinColumn()
  keyset: Keyset;
}

@InputType()
export class KitInput implements Partial<Kit> {
  @Field({ nullable: true })
  kit: string;

  @Field({ nullable: true })
  name: string;

  @Field(() => Int, { nullable: true })
  price: number;

  @Field(() => Int, { nullable: true })
  suggestedPrice: number;
}