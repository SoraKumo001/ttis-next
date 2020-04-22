import { Module } from '@nestjs/common';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { secret } from './secret.secret';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: secret,
      signOptions: { expiresIn: '6000s' },
    }),
  ],
  providers: [AuthService, AuthResolver],
})
export class AuthModule {}
