import { Module } from '@nestjs/common';
import { ContentsResolver } from './contents.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contents } from './contents';
import { ContentsService } from './contents.service';

@Module({
  imports: [TypeOrmModule.forFeature([Contents])],
  providers: [ContentsService,ContentsResolver]
})
export class ContentsModule {}
