import { Injectable } from '@nestjs/common';
import { ExtendRepository } from 'src/libs/ExtendRepository';
import { Files } from './files';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

export interface FileInfo {
  id: string;
  parentId?: string;
  kind: number;
  name: string;
  size: number;
  createAt: string;
  updateAt: string;
  childs?: FileInfo[];
}

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
   // await rep.count().then((count) => {
      // if (!count) {
      //   return rep.save({ kind: 0, name: "[ROOT]" });
      // }
    //});
  }
  public async getDirList() {
    const { rep } = this;

    const result = (await rep
      .createQueryBuilder()
      .select(`id,"parentId",kind,name,"createAt","updateAt",octet_length(value) as size`)
      .where("kind=0")
      .orderBy("name")
      .getRawMany()) as FileInfo[];
    // const hash = new Map<string, FileInfo>();
    // if (dirInfos) {
    //   for (const dir of dirInfos) {
    //     dir.childs = [];
    //     hash.set(dir.id, dir);
    //   }
    //   for (const dir of hash.values()) {
    //     const parentId = dir.parentId;
    //     if (parentId) {
    //       const p = hash.get(parentId);
    //       if (p && p.childs) p.childs.push(dir);
    //     }
    //   }
    // }

    return result;
  }
}
