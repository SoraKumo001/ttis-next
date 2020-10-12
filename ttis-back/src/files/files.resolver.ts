import { Resolver, Args, ID, Query, Mutation } from '@nestjs/graphql';
import { FilesService } from './files.service';
import { JwtAuthGuard, CurrentUser } from 'src/auth/auth.guard';
import { UseGuards } from '@nestjs/common';
import { User } from '@graphql/types';
import { GraphQLUpload } from 'apollo-server-express';

import { Files } from './files';
import { FileUpload } from 'graphql-upload';

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
  @Query(() => [Files], { nullable: true })
  async dirFiles(
    @CurrentUser() user: User,
    @Args('id', { type: () => ID }) id: string,
  ) {
    if (!user) return null;
    const { service } = this;
    return service.getFileList(id);
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
    return service.createDir(id, name);
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
    return service.rename(id, name);
  }
  @UseGuards(JwtAuthGuard)
  @Mutation(() => Boolean, {
    nullable: true,
    description: '複数ファイルの削除',
  })
  async deleteFile(
    @CurrentUser() user: User,
    @Args('id', { type: () => ID }) id: string,
  ) {
    if (!user) return null;
    const { service } = this;
    return service.deleteFile(id);
  }
  @UseGuards(JwtAuthGuard)
  @Mutation(() => Boolean, {
    nullable: true,
    description: '複数ファイルの削除',
  })
  async deleteFiles(
    @CurrentUser() user: User,
    @Args('ids', { type: () => [ID] }) ids: string[],
  ) {
    if (!user) return null;
    const { service } = this;
    const result = ids.map((id) => service.deleteFile(id));
    return (await Promise.all(result)).reduce((a, c) => a && c, true);
  }
  @UseGuards(JwtAuthGuard)
  @Mutation(() => Boolean, { nullable: true, description: 'ファイルの移動' })
  async moveFile(
    @CurrentUser() user: User,
    @Args('targetId', { type: () => ID }) targetId: string,
    @Args('id', { type: () => ID }) id: string,
  ) {
    if (!user) return null;
    const { service } = this;
    return service.move(targetId, id);
  }
  @UseGuards(JwtAuthGuard)
  @Mutation(() => ID, { nullable: true, description: 'ファイルのアップロード' })
  async uploadFile(
    @CurrentUser() user: User,
    @Args({
      name: 'parentId',
      type: () => ID,
      description: '親ディレクトリのID',
    })
    parentId: string,
    @Args({
      name: 'file',
      type: () => GraphQLUpload,
      description: 'graphql-uploadのファイルデータ',
    })
    file: FileUpload,
  ): Promise<string | null> {
    if (!user) return null;
    let buffer = Buffer.alloc(0);
    const { service } = this;
    return new Promise(async (resolve, reject) =>
      file
        .createReadStream()
        .on('data', (value) => {
          buffer = Buffer.concat([buffer, value as Buffer]);
        })
        .on('end', () => {
          resolve(service.saveFile(parentId, file.filename, buffer));
        })
        .on('error', () => reject(false)),
    );
  }
}
