import { Injectable } from '@nestjs/common';
import { ExtendRepository } from 'src/libs/ExtendRepository';
import { Files } from './files';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(Files)
    private readonly rep: ExtendRepository<Files>,
  ) {
    this.rep = new ExtendRepository(rep.manager.connection, Files);
  }
  async onModuleInit() {
    const { rep } = this;
    await rep.count().then((count) => {
      if (!count) {
        return rep.save({ kind: 0, name: '[ROOT]' });
      }
    });
  }
  public async getDirList() {
    const { rep } = this;
    const result = (await rep
      .createQueryBuilder()
      .select(
        `id,"parentId",kind,name,"createAt","updateAt",coalesce(octet_length(value),0) as size`,
      )
      .where('kind=0')
      .orderBy('"parentId" desc,name')
      .getRawMany()) as Files[];
    return result;
  }
  public async getFileInfo(id?: string, dir?: boolean) {
    const { rep } = this;
    const whereDir = dir ? { kind: 0 } : undefined;
    return (await rep
      .createQueryBuilder()
      .select(
        `id,"parentId",kind,name,"createAt","updateAt",coalesce(octet_length(value),0) as size`,
      )
      .where(id ? { id, ...whereDir } : { parent: null })
      .getRawOne()) as Files | null;
  }
  public async getFileList(id: string) {
    const { rep } = this;
    const result = (await rep
      .createQueryBuilder()
      .select(
        `id,"parentId",kind,name,"createAt","updateAt",coalesce(octet_length(value),0) as size`,
      )
      .where('"parentId" = :id', { id })
      .orderBy('kind,"parentId" desc,name')
      .getRawMany()) as Files[];
    return result;
  }
  public async createDir(
    parentId: undefined | string,
    name: string,
  ): Promise<Files | null> {
    const { rep } = this;
    //親ディレクトリの存在確認
    if (!parentId) {
      const root = await this.getFileInfo();
      if (!root) return null;
      parentId = root.id;
      if (!parentId) return null;
    } else {
      if (
        !(await rep.findOne({
          select: ['id'],
          where: { id: parentId, kind: 0 },
        }))
      )
        return null;
    }
    //ディレクトリ作成
    const dir = await rep
      .save({ kind: 0, name, parent: { id: parentId } })
      .catch(() => null);
    return dir ? this.getFileInfo(dir.id) : null;
  }
  public async rename(id: string, name: string) {
    const { rep } = this;
    const res = await this.getFileInfo(id);
    if (!res) return null;
    res.name = name;
    return rep.save(res);
  }
  public async deleteFile(id: string) {
    const { rep } = this;
    const res = await this.getFileInfo(id);
    if (!res || !res.parentId) return false;
    if (res.kind !== 0) {
      return (await rep.delete(id)) !== null;
    }
    const children = await rep.getChildren(res, {
      order: ['mpath', 'DESC', 'NULLS FIRST'],
    });
    if (!children) return true;
    const ids = children.map((child) => child.id);
    return (await rep.delete(ids)) !== null;
  }
  public async move(targetId: string, id: string) {
    const { rep } = this;
    //移動元存在確認
    const src = await this.getFileInfo(id);
    if (!src || !src.parentId) return false;
    //ターゲットディレクトリ存在確認
    const target = await this.getFileInfo(targetId);
    if (!target) return false;
    //ツリー構造の修正
    const list = await rep.getChildren(src, { select: ['id'] });
    if (!list) return false;
    list.forEach((file) => {
      if (file.id === id) file.parent = target;
    });
    return (await rep.save(list)) !== null;
  }

  public async saveFile(parentId: string, name: string, buffer: Buffer) {
    const { rep } = this;
    const cur = await rep.findOne({
      select: ['id', 'kind'],
      where: { parentId, name },
    });
    if (cur) {
      if (cur.kind !== 1) return null;
      cur.value = buffer;
      rep.save(cur);
      return cur.id;
    } else {
      const file = await rep.save({
        kind: 1,
        name,
        parent: { id: parentId },
        value: buffer,
      });
      return file?.id;
    }
  }
  public async getFile(id: string) {
    const { rep } = this;
    const result = (await rep
      .createQueryBuilder()
      .select('name,octet_length(value) as size,"updateAt",value')
      .where('id=:id and kind=1', { id })
      .getRawOne()) as {
      name: string;
      size: number;
      date: string;
      value: Buffer;
    };
    return result;
  }
}
