import {
  Resolver,
  Args,
  Mutation,
  ID,
  Query,
  Info,
  Int,
} from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user';
import { getSHA256 } from '@libs/hashTools';
import { getFields } from '@libs/graphQLTools';

@Resolver('User')
export class UserResolver {
  constructor(
    @InjectRepository(User)
    private readonly rep: Repository<User>,
  ) {}
  @Query(_ => [User], { nullable: true })
  async users(@Info() info) {
    const { rep } = this;
    const fields = getFields(info);
    console.log(fields);
    return await rep.find({
      select: Object.keys(fields) as (keyof User)[],
      where: { enable: true },
      order: { id: 'ASC' },
    });
  }
  @Mutation(_ => Boolean)
  async deleteUser(@Args('id', { type: () => Int }) id: number) {
    const { rep } = this;
    return !!(await rep.delete(id));
  }

  @Mutation(_ => Boolean)
  async deleteUsers(@Args('ids', { type: () => [Int] }) ids: number[]) {
    const { rep } = this;
    return !!(await rep.delete(ids));
  }

  @Mutation(_ => User, { nullable: true })
  async user(
    @Args('id', { nullable: true, type: () => Int }) id?: number,
    @Args('name', { nullable: true }) name?: string,
    @Args('password', { nullable: true }) password?: string,
  ) {
    const { rep } = this;
    if (!id) {
      if (name && password) {
        return rep.save({ name, password: getSHA256(password) });
      }
    } else {
      const user = await rep.findOne(id);
      if (user) {
        if (name) user.name = name;
        if (password) user.password = getSHA256(password);
        return user.save();
      }
    }
    return null;
  }
}
