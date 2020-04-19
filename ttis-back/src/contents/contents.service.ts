import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Contents } from './contents';
import { ExtendRepository } from '@libs/ExtendRepository';
import { Repository } from 'typeorm';

type VECTOR_TYPE = 'CHILD_FIRST' | 'CHILD_LAST' | 'BEFORE' | 'NEXT';

@Injectable()
export class ContentsService implements OnModuleInit {
  private readonly expRep: ExtendRepository<Contents>;
  constructor(
    @InjectRepository(Contents)
    private readonly rep: Repository<Contents>,
  ) {
    this.expRep = new ExtendRepository(rep.manager.connection, Contents);
  }
  async create(
    id: string,
    vector: VECTOR_TYPE,
    page: boolean,
  ): Promise<Contents|null> {
    const { rep } = this;
    const { parentId, priority } = await this.updateVector(id, vector);
    if (parentId) {
      const contents = await rep.save({
        parent: { id: parentId },
        page: !!page,
        title: 'New',
        priority,
      });
      return contents;
    }
    return null;
  }

  async contents() {
    const { expRep } = this;
    const root = await expRep.findOne({ where: { parent: null } });
    return await expRep.getChildren(root, { order: "priority" });
  }
  async update(contents: Partial<Contents>) {
    const { rep } = this;
    const con = await rep.findOne(contents.id);
    if (con) {
      return rep.save({ ...con, ...contents });
    }
    return null;
  }
  async updateVector(id: string, vector: VECTOR_TYPE) {
    const { rep } = this;
    const baseContents = await rep.findOne({ select: ['id','parentId'], where: { id } });
    let priority: number;
    let parentId: string;
    if (vector === 'BEFORE' || vector === 'NEXT') {
      parentId = baseContents.parentId;
      console.log("parent",parentId);
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
        rep.save(list);
      }
    } else if (vector === 'CHILD_FIRST') {
      parentId = baseContents.id;
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
        rep.save(list);
      }
    } else {
      parentId = baseContents.id;
      const count = await rep.count({
        parentId: baseContents.id,
      });
      priority = count + 1;
    }
    return { parentId, priority };
  }

  async onModuleInit() {
    const { rep } = this;
    await rep.count().then((count) => {
      if (!count) {
        return rep.save({ title: 'TOP' });
      }
    });
  }
}
