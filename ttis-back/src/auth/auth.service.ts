import { Injectable } from '@nestjs/common';
import { User } from '../user/user';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { secret } from './secret.secret';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService extends PassportStrategy(Strategy) {
  constructor(
    private readonly userService: UserService,
    private readonly jwt: JwtService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secret,
    });
  }
  async validate({
    id,
    password,
  }: {
    id: number;
    password: string;
  }): Promise<User | undefined> {
    const { userService } = this;
    return userService.validateUser(id, password);
  }
  async login(name: string, password: string) {
    const { userService, jwt } = this;
    const user = await userService.login(name, password);
    if (!user) return null;

    const token = jwt.sign({ id: user.id, password: user.password });
    return { token, user: user };
  }
  async currentUser(user:User) {
    const { jwt } = this;
    if (!user) return null;

    const token = jwt.sign({ id: user.id, password: user.password });
    return { token, user: user };
  }
}
