import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ContentsModule } from './contents/contents.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { DBModule } from './db.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      installSubscriptionHandlers: true,
      autoSchemaFile: 'graphql/schema.graphql',
      context: (con) => con,
    }),
    DBModule,
    ContentsModule,
    UserModule,
    AuthModule,
  ],
})
export class AppModule {}
