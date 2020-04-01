import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';
import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(_ => Int)
  @PrimaryGeneratedColumn() //自動番号
  id!: number;
  @Field()
  @Column({ default: true })
  enable!: boolean;
  @Field()
  @Column({ unique: true })
  name!: string;
  @Column({ nullable: true })
  password?: string;
  @Field()
  @Column({ default: '{}' })
  info!: string;
}
