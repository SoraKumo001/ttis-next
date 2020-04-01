import { Injectable, ExecutionContext, createParamDecorator } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(){
    super()
  }
  handleRequest(_err, user) {
    return user || null;
  }
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }
}
export const CurrentUser = createParamDecorator(
  async (_, ctx: ExecutionContext) => ctx.getArgByIndex(2).req.user,
);