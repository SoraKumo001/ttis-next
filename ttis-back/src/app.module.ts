import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ContentsModule } from './contents/contents.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { DBModule } from './db.module';
import { FilesModule } from './files/files.module';
import { GraphQLUpload } from 'graphql-upload';

@Module({
  imports: [
    GraphQLModule.forRoot({
      playground: true,
      installSubscriptionHandlers: true,
      autoSchemaFile: 'graphql/schema.graphql',
      context: (con) => con,
      uploads: {
        maxFileSize: 10000000,
        maxFieldSize:10000000,
        maxFiles: 5,
      },
    }),
    DBModule,
    ContentsModule,
    UserModule,
    AuthModule,
    FilesModule,
  ],
})
export class AppModule {}
