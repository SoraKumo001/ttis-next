import { Resolver, Args, Info, ID, Int, Query, Mutation } from '@nestjs/graphql';
import { FilesService } from './files.service';
import { JwtAuthGuard, CurrentUser } from 'src/auth/auth.guard';
import { UseGuards } from '@nestjs/common';
import { User } from '@graphql/types';
import { GraphQLUpload, FileUpload } from 'graphql-upload';
import { createWriteStream } from 'fs';

import { Files } from './files';

@Resolver('Files')
export class FilesResolver {
  constructor(private readonly service: FilesService) {}

  @UseGuards(JwtAuthGuard)
  @Query(() => [Files], { nullable: true })
  async dirTree(@CurrentUser() user: User) {
    if (!user) return null;
    const { service } = this;
    return service.getDirList();
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Files, { nullable: true })
  async createDir(
    @CurrentUser() user: User,
    @Args('id', { type: () => ID }) id: string,
    @Args('name') name: string,
  ) {
    if (!user) return null;
    const { service } = this;
    return service.createDir(id,name);
  }
  @UseGuards(JwtAuthGuard)
  @Mutation(() => Files, { nullable: true })
  async renameFile(
    @CurrentUser() user: User,
    @Args('id', { type: () => ID }) id: string,
    @Args('name') name: string,
  ) {
    if (!user) return null;
    const { service } = this;
    return service.rename(id,name);
  }
  @UseGuards(JwtAuthGuard)
  @Mutation(() => Boolean, { nullable: true })
  async moveFile(
    @CurrentUser() user: User,
    @Args('targetId', { type: () => ID }) targetId: string,
    @Args('id', { type: () => ID }) id: string,
  ) {
    if (!user) return null;
    const { service } = this;
    return service.move(targetId,id);
  }

  @Mutation(() => Boolean, { nullable: true })
  async uploadFile(@Args({name: 'file', type: () => GraphQLUpload})
  {
      createReadStream,
      filename
  }: FileUpload): Promise<boolean> {
      return new Promise(async (resolve, reject) => 
          createReadStream()
              .pipe(createWriteStream(`./uploads/${filename}`))
              .on('finish', () => resolve(true))
              .on('error', () => reject(false))
      );
  }
}
