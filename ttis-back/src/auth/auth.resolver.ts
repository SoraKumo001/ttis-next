import {
  Resolver,
  Mutation,
  ObjectType,
  Field,
  Args,
  Query,
} from '@nestjs/graphql';
import { User } from '../user/user';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard, CurrentUser } from './auth.guard';
import { AuthService } from './auth.service';

@ObjectType()
export class Login {
  @Field()
  token?: string;
  @Field()
  user?: User;
}

@Resolver('Auth')
export class AuthResolver {
  constructor(private readonly service: AuthService) {}
  @UseGuards(JwtAuthGuard)
  @Query(() => User, { nullable: true })
  async currentUser(@CurrentUser() user: User) {
    return user;
  }

  @Mutation(() => Login, { nullable: true })
  async login(@Args('name') name: string, @Args('password') password: string) {
    return this.service.login(name, password);
  }
}
