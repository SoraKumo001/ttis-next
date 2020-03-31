import { Module } from '@nestjs/common';
import { ContentsResolver } from './contents.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contents } from './contents';

@Module({
  imports: [TypeOrmModule.forFeature([Contents])],
  providers: [ContentsResolver]
})
export class ContentsModule {}
