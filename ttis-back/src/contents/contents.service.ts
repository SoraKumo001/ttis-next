import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Contents } from './contents';
import { ExtendRepository } from '@libs/ExtendRepository';
import { Repository } from 'typeorm';
import { GraphQLFeald as GraphQLField } from '@libs/graphQLTools';

export type VECTOR_TYPE = 'CHILD_FIRST' | 'CHILD_LAST' | 'BEFORE' | 'NEXT';

@Injectable()
export class ContentsService implements OnModuleInit {
  private readonly expRep: ExtendRepository<Contents>;
  constructor(
    @InjectRepository(Contents)
    private readonly rep: Repository<Contents>,
  ) {
    this.expRep = new ExtendRepository(rep.manager.connection, Contents);
  }
  async onModuleInit() {
    const { rep } = this;
    await rep.count().then((count) => {
      if (!count) {
        return rep.save({ title: 'TOP', visible: true });
      }
    });
  }

  async create({
    parentId,
    vector,
    title_type,
    title,
    value_type,
    value,
    visible,
    page,
  }: { vector?: VECTOR_TYPE } & Partial<Contents>): Promise<Contents | null> {
    const { rep } = this;
    if (!parentId)
      parentId = (await rep.findOne({ where: { parentId: null } }))?.id;
    if (parentId) {
      const result = await this.updateVector(
        parentId,
        vector === undefined ? 'CHILD_LAST' : vector,
      );
      const contents = await rep.save({
        parent: { id: result.parentId },
        page: page === undefined || page,
        title_type,
        title: title,
        value_type,
        value,
        visible,
        priority: result.priority,
      });
      return contents;
    }
    return null;
  }

  async contents() {
    const { expRep } = this;
    const root = await expRep.findOne({ where: { parent: null } });
    return root ? expRep.getChildren(root, { order: 'priority' }) : null;
  }
  async contentsTree({
    id,
    visible,
    level,
    select,
  }: {
    id?: string;
    visible?: boolean;
    level?: number;
    select?: GraphQLField;
  } = {}) {
    const { expRep } = this;
    const rootWhere: { [key: string]: unknown } = {};
    if (id) rootWhere['id'] = id;
    else rootWhere['parentId'] = null;
    if (visible) {
      rootWhere['visible'] = true;
    }
    const root = await expRep.findOne({ select: ['id'], where: rootWhere });
    if (!root) return null;

    const fieldSet = new Set<string>();
    const createSelect = (fields?: GraphQLField) => {
      fields?.forEach((field) => {
        if (typeof field === 'string') fieldSet.add(field);
        else createSelect(field[1]);
      });
    };
    createSelect(select);
    if (fieldSet.size) fieldSet.add('id');

    const contents = await expRep.getChildrenTree(root, {
      select:
        fieldSet.size === 0
          ? undefined
          : (Array.from(fieldSet) as (keyof Contents)[]),
      level,
      where: visible ? 'visible = true' : undefined,
      order: 'priority',
    })||null;

    //Level制限した場合に、最終レベルのchildrenをnullにする
    if (level && contents) {
      const setChildLevel = (
        contents: Contents,
        level: number,
        nowLevel: number,
      ) => {
        if (level === nowLevel) contents.children = null;
        else
          contents.children?.forEach((contents) =>
            setChildLevel(contents, level, nowLevel + 1),
          );
      };

      setChildLevel(contents, level, 1);
    }
    return contents;
  }
  async update(contents: Partial<Contents>) {
    const { rep } = this;
    const con = await rep.findOne(contents.id, { select: ['id'] });
    if (con?.id) {
      await rep.save(contents);
      return rep.findOne(contents.id);
    }
    return null;
  }
  async updateVector(id: string, vector: VECTOR_TYPE) {
    const { rep } = this;
    const baseContents = await rep.findOne({
      select: ['id', 'parentId'],
      where: { id },
    });
    let priority=0;
    let parentId: string | undefined;
    if (vector === 'BEFORE' || vector === 'NEXT') {
      parentId = baseContents?.parentId;
      if (parentId) {
        const list = await rep.find({
          select: ['id', 'priority'],
          where: { parentId },
          order: { priority: 'ASC' },
        });
        let p = 1;

        for (const contents of list) {
          if (contents.id === id && vector === 'BEFORE') {
            (priority = p), ++p;
          }
          contents.priority = p;
          if (contents.id === id && vector === 'NEXT') {
            ++p;
            priority = p;
          }
          ++p;
        }
        await rep.save(list);
      }
    } else if (vector === 'CHILD_FIRST') {
      parentId = baseContents?.id;
      if (parentId) {
        const list = await rep.find({
          select: ['id', 'priority'],
          where: { parentId },
          order: { priority: 'ASC' },
        });
        let p = 1;
        for (const contents of list) {
          contents.priority = ++p;
        }
        priority = 1;
        await rep.save(list);
      }
    } else {
      parentId = baseContents?.id;
      const count = await rep.count({
        parentId: baseContents?.id,
      });
      priority = count + 1;
    }
    return { parentId, priority };
  }
}
