import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageModule } from './message/message.module';
import { MessageResolver } from './message/message.resolver';
import { ContentsModule } from './contents/contents.module';
import { Message } from './message/message';
import { Contents } from './contents/contents';
import { User } from './user/user';
import { UserModule } from './user/user.module';


@Module({
  imports: [
    GraphQLModule.forRoot({
      installSubscriptionHandlers: true,
      autoSchemaFile: "schema.graphql",
    }),
    TypeOrmModule.forRoot({
      type: "postgres",
      host:"localhost",
      database: "ttis",
      username: "ttis",
      password: "test",
      logging: true,
      synchronize: true,
      autoLoadEntities:true,
      entities:[
        Message,Contents,User
      ]
    }),
    MessageModule,
    ContentsModule,
    UserModule,
  ],
  providers: [MessageResolver],
})
export class AppModule {}
