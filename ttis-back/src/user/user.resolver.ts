import { Resolver, Args, Mutation, Query, Info, Int } from '@nestjs/graphql';
import { User } from './user';
import { getFields } from '@libs/graphQLTools';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard, CurrentUser } from '../auth/auth.guard';
import { UserService } from './user.service';

@Resolver('User')
export class UserResolver {
  constructor(
    private readonly service: UserService,
  ) {}
  @UseGuards(JwtAuthGuard)
  @Query((_) => [User], { nullable: true })
  async users(@Info() info, @CurrentUser() user) {
    if (!user) return null;
    return this.service.users(getFields(info));
  }
  @Mutation((_) => Boolean)
  async deleteUser(
    @Args('id', { type: () => Int }) id: number,
    @CurrentUser() user,
  ) {
    if (!user) return null;
    return this.service.deleteUser(id);
  }

  @Mutation((_) => Boolean)
  async deleteUsers(
    @Args('ids', { type: () => [Int] }) ids: number[],
    @CurrentUser() user,
  ) {
    if (!user) return null;
    return this.service.deleteUsers(ids);
  }

  @Mutation((_) => User, { nullable: true })
  async user(
    @Args('id', { nullable: true, type: () => Int }) id?: number,
    @Args('name', { nullable: true }) name?: string,
    @Args('password', { nullable: true }) password?: string,
  ) {
    return this.service.setUser(id,name,password);
  }
}
