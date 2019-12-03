import { Entity, Column, BaseEntity, ManyToOne, JoinColumn, PrimaryColumn } from "typeorm";
import { ObjectType, Field, InputType } from "type-graphql";
import uniqid from 'uniqid'
import { Keyset } from "./Keyset";

@ObjectType()
@Entity("colors")
export class Color extends BaseEntity {
  @Field(() => String)
  @PrimaryColumn("varchar", { default: `${uniqid("clr_")}` })
  id: string = uniqid("clr_")

  @Field({ nullable: true })
  @Column("text", { nullable: true })
  hex: string

  @Field(() => String, { nullable: true })
  @Column("text")
  ral: string

  @ManyToOne(() => Keyset, keyset => keyset.colors, { onDelete: 'CASCADE' })
  @JoinColumn()
  keyset: Keyset;
}

@InputType()
export class ColorInput implements Partial<Color> {
  @Field({ nullable: true })
  hex: string;

  @Field({ nullable: true })
  ral: string;
}