import {
  Resolver,
  Mutation,
  ID,
  Args,
  Query,
  registerEnumType,
} from '@nestjs/graphql';
import { Contents } from './contents';
import { ContentsService } from './contents.service';

enum ContentsVector {
  CHILD_FIRST = 'CHILD_FIRST',
  CHILD_LAST = 'CHILD_LAST',
  BEFORE = 'BEFORE',
  NEXT = 'NEXT',
}
registerEnumType(ContentsVector, {
  name: 'ContentsVector',
});
@Resolver('Contents')
export class ContentsResolver {
  constructor(private readonly service: ContentsService) {}
  @Mutation((_) => Contents)
  async create(
    @Args('parent') parent: string,
    @Args('vector', { type: () => ContentsVector })
    vector: 'CHILD_FIRST' | 'CHILD_LAST' | 'BEFORE' | 'NEXT',
    @Args('page') page?: boolean,
  ): Promise<Contents> {
    const { service } = this;
    return service.create(parent, vector, page);
  }
  @Mutation((_) => Contents)
  async update(
    @Args('id') id: string,
    @Args('vector', { nullable: true }) vector?: string,
    @Args('page', { nullable: true }) page?: boolean,
    @Args('visible', { nullable: true }) visible?: boolean,
    @Args('title_type', { nullable: true }) title_type?: number,
    @Args('title', { nullable: true }) title?: string,
    @Args('parent', { nullable: true }) parent?: string,
    @Args('value_type', { nullable: true }) value_type?: string,
    @Args('value', { nullable: true }) value?: string,
  ) {
    const { service } = this;
    return service.update({
      id,
      page,
      visible,
      title_type,
      title,
      parentId: parent,
      value_type,
      value,
    });
  }
  @Query((_) => Contents, { nullable: true })
  async contents() {
    const { service } = this;
    return service.contents();
  }
}
