import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Tree,
  TreeChildren,
  TreeParent,
} from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
@Entity()
@Tree('materialized-path')
export class Contents {
  @Field(_ => ID)
  @PrimaryGeneratedColumn('uuid')
  id!: string;
  @Field()
  @Column({ default: 1000 })
  priority!: number;
  @Field()
  @Column({ nullable: true })
  visible?: boolean;
  @Field()
  @Column({ default: true })
  page!: boolean;
  @Field()
  @Column({ default: 1 })
  title_type!: number;
  @Field()
  @Column({ default: 'New' })
  title!: string;
  @Field()
  @Column({ default: 'TEXT' })
  value_type!: string;
  @Field()
  @Column({ default: '' })
  value!: string;
  title2?: string;
  @Field()
  @Column({ nullable: true })
  parentId?: number;
  @Field(_=>[Contents],{ nullable: true })
  @TreeChildren()
  children!: Contents[];
  @Field()
  @TreeParent()
  parent?: Contents;
  mpath?: string;
  @Field()
  @CreateDateColumn()
  createAt!: Date;
  @Field()
  @UpdateDateColumn()
  updateAt: Date;
}
