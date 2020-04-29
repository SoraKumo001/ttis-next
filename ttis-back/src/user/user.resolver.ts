import { Resolver, Args, Mutation, Query, Info, Int } from '@nestjs/graphql';
import { User } from './user';
import { getFields } from '@libs/graphQLTools';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard, CurrentUser } from '../auth/auth.guard';
import { UserService } from './user.service';

@Resolver('User')
export class UserResolver {
  constructor(private readonly service: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Query((_) => [User], { nullable: true })
  async users(@CurrentUser() user, @Info() info) {
    if (!user) return null;
    return this.service.users(getFields(info));
  }

  @UseGuards(JwtAuthGuard)
  @Mutation((_) => User, { nullable: true })
  async createUser(
    @Args('name') name: string,
    @Args('password') password: string,
    @Args('info', { nullable: true }) info?: string,
    @CurrentUser() user?,
  ) {
    if (!user) return null;
    return this.service.setUser(
      undefined,
      name,
      password,
      info && JSON.parse(info),
    );
  }

  @UseGuards(JwtAuthGuard)
  @Mutation((_) => User, { nullable: true })
  async updateUser(
    @Args('id', { type: () => Int }) id: number,
    @Args('name', { nullable: true }) name?: string,
    @Args('password', { nullable: true }) password?: string,
    @Args('info', { nullable: true }) info?: string,
    @CurrentUser() user?,
  ) {
    if (!user) return null;
    return this.service.setUser(id, name, password, info && JSON.parse(info));
  }

  @UseGuards(JwtAuthGuard)
  @Mutation((_) => Boolean)
  async deleteUser(
    @CurrentUser() user,
    @Args('id', { type: () => Int }) id: number,
  ) {
    if (!user) return false;
    return this.service.deleteUser(id);
  }
  @UseGuards(JwtAuthGuard)
  @Mutation((_) => Boolean)
  async deleteUsers(
    @Args('ids', { type: () => [Int] }) ids: number[],
    @CurrentUser() user?,
  ) {
    if (!user) return false;
    return this.service.deleteUsers(ids);
  }

}
