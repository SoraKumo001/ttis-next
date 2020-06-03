import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Files } from './files';
import { FilesResolver } from './files.resolver';
import { FilesService } from './files.service';

@Module({
  imports: [TypeOrmModule.forFeature([Files])],
  providers: [FilesService, FilesResolver],
})
export class FilesModule {}
