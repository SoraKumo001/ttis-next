import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Tree,
  TreeChildren,
  TreeParent,
  Index,
} from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
@Entity()
@Index(['parent', 'name'], { unique: true })
@Tree('materialized-path')
export class Files {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id!: string;
  @Field()
  @Column({ default: 0 })
  kind!: number;
  @Field()
  @Column()
  name!: string;
  @Field({ nullable: true })
  @Column({ nullable: true })
  parentId?: string;
  @Field({ nullable: true })
  @TreeParent()
  parent?: Files;
  @Field(() => [Files], { nullable: true })
  @TreeChildren()
  children?: Files[];
  @Field()
  size!: number;
  @Column({ type: 'bytea', nullable: true })
  value?: Buffer;
  @Field()
  @CreateDateColumn()
  createAt!: Date;
  @Field()
  @UpdateDateColumn()
  updateAt!: Date;
}
