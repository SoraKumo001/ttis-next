import { Resolver, Mutation, ID, Args, Query } from '@nestjs/graphql';
import { Contents } from './contents';
import { InjectRepository } from '@nestjs/typeorm';
import { TreeRepository } from 'typeorm';
import { OnModuleInit } from '@nestjs/common';

@Resolver('Contents')
export class ContentsResolver implements OnModuleInit{
  constructor(
    @InjectRepository(Contents)
    private readonly rep: TreeRepository<Contents>
  ) {

  }
  @Mutation(_ => ID)
  async create(
    @Args('id', { nullable: true }) parent?: string,
    @Args('vector', { nullable: true }) vector?: number,
    @Args('page', { nullable: true }) page?: boolean,
  ): Promise<string> {
    const { rep } = this;
    if (!parent) {
      parent = (await rep.findOne(undefined, { where: { parentId: null } })).id;
    }
    const contents = await rep.save({
      parent: { id: parent },
      page: !!page,
      title: 'New',
    });
    return contents.id;
  }

  @Query(_ => Contents, { nullable: true })
  async contents(
  ) {
    const { rep } = this;
    return (await rep.findTrees())[0];
  }

  async onModuleInit() {
    const {rep} = this;
    await rep.count().then(count => {
      if (!count) {
        rep.save({ title: 'TOP' });
      }
    });
  }
}
