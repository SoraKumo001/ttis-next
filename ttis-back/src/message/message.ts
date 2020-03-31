import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn
} from "typeorm";
import { ObjectType, Field, ID, Int } from "@nestjs/graphql";

@Entity()
@ObjectType()
export class Message {
  @PrimaryGeneratedColumn() //自動番号
  @Field(_ =>ID)
  id!:number;
  @Column()
  @Field()
  name!: string;
  @Column()
  @Field()
  value!: string;
  @CreateDateColumn()
  @Field()
  createAt!: Date;
  @UpdateDateColumn()
  @Field()
  updateAt!: Date;
}

@ObjectType()
export class Messages {
  @Field(_=>Int)
  count:number;
  @Field(_=>[Message])
  nodes:Message[]
}