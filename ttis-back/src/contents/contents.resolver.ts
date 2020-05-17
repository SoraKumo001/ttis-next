import {
  Resolver,
  Mutation,
  ID,
  Args,
  Query,
  registerEnumType,
  Info,
  Int,
} from '@nestjs/graphql';
import { GraphQLResolveInfo } from 'graphql';
import { Contents } from './contents';
import { ContentsService } from './contents.service';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard, CurrentUser } from '../auth/auth.guard';
import { User } from '../user/user';
import { getFields } from '@libs/graphQLTools';

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
  @UseGuards(JwtAuthGuard)
  @Mutation(() => Contents, { nullable: true })
  async createContents(
    @CurrentUser() user: User,
    @Args('parent', { type: () => ID, nullable: true }) parentId: string,
    @Args('vector', { type: () => ContentsVector, nullable: true })
    vector: 'CHILD_FIRST' | 'CHILD_LAST' | 'BEFORE' | 'NEXT',
    @Args('page', { nullable: true }) page?: boolean,
    @Args('visible', { nullable: true }) visible?: boolean,
    @Args('title_type', { nullable: true, type: () => Int })
    title_type?: number,
    @Args('title', { nullable: true }) title?: string,
    @Args('value_type', { nullable: true }) value_type?: string,
    @Args('value', { nullable: true }) value?: string,
  ): Promise<Contents | null> {
    if (!user) return null;
    const { service } = this;
    return service.create({
      parentId,
      visible,
      vector,
      page,
      title_type,
      title,
      value_type,
      value,
    });
  }
  @UseGuards(JwtAuthGuard)
  @Mutation(() => Contents, { nullable: true })
  async updateContents(
    @CurrentUser() user: User,
    @Args('id', { type: () => ID }) id: string,
    @Args('page', { nullable: true }) page?: boolean,
    @Args('visible', { nullable: true }) visible?: boolean,
    @Args('title_type', { nullable: true, type: () => Int })
    title_type?: number,
    @Args('title', { nullable: true }) title?: string,
    @Args('parent', { type: () => ID, nullable: true }) parent?: string,
    @Args('value_type', { nullable: true }) value_type?: string,
    @Args('value', { nullable: true }) value?: string,
  ) {
    if (!user) return null;
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
  @UseGuards(JwtAuthGuard)
  @Query(() => Contents)
  async contentsTree(
    @CurrentUser() user: User,
    @Info() info: GraphQLResolveInfo,
    @Args('id', { nullable: true, type: () => ID }) id?: string,
    @Args('visible', { nullable: true }) visible?: boolean,
    @Args('level', { nullable: true, type: () => Int }) level?: number,
  ) {
    const { service } = this;
    const filter = new Set(['parentId', 'children']);
    return service.contentsTree({
      id,
      visible: !user ? true : visible,
      level,
      select: getFields(info).filter(
        (name) => !filter.has(typeof name === 'string' ? name : name[0]),
      ),
    });
  }
  @UseGuards(JwtAuthGuard)
  @Query(() => [Contents])
  async contentsPage(
    @CurrentUser() user: User,
    @Info() info: GraphQLResolveInfo,
    @Args('id', { nullable: true, type: () => ID }) id?: string,
    @Args('visible', { nullable: true }) visible?: boolean,
  ) {
    const { service } = this;
    const filter = new Set(['parentId', 'children']);
    const contents = await service.contentsPage({
      id,
      visible: !user ? true : visible,
      select: getFields(info).filter(
        (name) => !filter.has(typeof name === 'string' ? name : name[0]),
      ),
    });
    const contentsList: Contents[] = [];
    const createList = (contens: Contents) => {
      contentsList.push(contens);
      contens.children?.forEach(createList);
    };
    if (contents) createList(contents);
    return contentsList;
  }
  @UseGuards(JwtAuthGuard)
  @Query(() => [Contents])
  async contentsList(
    @CurrentUser() user: User,
    @Info() info: GraphQLResolveInfo,
    @Args('id', { nullable: true, type: () => ID }) id?: string,
    @Args('visible', { nullable: true }) visible?: boolean,
    @Args('level', { nullable: true, type: () => Int }) level?: number,
  ) {
    const { service } = this;
    const filter = new Set(['parentId', 'children']);
    const contents = await service.contentsTree({
      id,
      visible: !user ? true : visible,
      level,
      select: getFields(info).filter(
        (name) => !filter.has(typeof name === 'string' ? name : name[0]),
      ),
    });
    const contentsList: Contents[] = [];
    const createList = (contens: Contents) => {
      contentsList.push(contens);
      contens.children?.forEach(createList);
    };
    if (contents) createList(contents);
    return contentsList;
  }
  @UseGuards(JwtAuthGuard)
  @Query(() => Contents)
  async contents(
    @CurrentUser() user: User,
    @Args('id', { type: () => ID, nullable: true }) id?: string,
  ) {
    const { service } = this;
    return (
      user &&
      service.contents({
        id,
      })
    );
  }
}
