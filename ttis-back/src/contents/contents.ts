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
import { ObjectType, Field, ID, Int } from '@nestjs/graphql';

@ObjectType()
@Entity()
@Tree('materialized-path')
export class Contents {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id!: string;
  @Field()
  @Column({ default: 1000 })
  priority!: number;
  @Field({ nullable: true })
  @Column({ nullable: true })
  visible?: boolean;
  @Field()
  @Column({ default: true })
  page!: boolean;
  @Field(() => Int)
  @Column({ default: 1 })
  title_type!: number;
  @Field()
  @Column({ default: 'New' })
  title!: string;
  @Field()
  @Column({ default: 'HTML' })
  value_type!: string;
  @Field()
  @Column({ default: '' })
  value!: string;
  title2?: string;
  @Field({ nullable: true })
  @Column({ nullable: true, default: null })
  parentId?: string;
  @Field(() => [Contents], { nullable: true })
  @TreeChildren()
  children!: Contents[] | null;
  @Field()
  @TreeParent()
  parent?: Contents;
  mpath?: string;
  @Field()
  @CreateDateColumn()
  createAt!: Date;
  @Field()
  @UpdateDateColumn()
  updateAt!: Date;
}

@ObjectType()
export class PageContents {
  @Field(() => ID)
  id!: string;
  @Field(() => [Contents])
  contents!: Contents[];
}
