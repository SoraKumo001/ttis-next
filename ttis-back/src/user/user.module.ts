import { Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserResolver],
})
export class UserModule {}
