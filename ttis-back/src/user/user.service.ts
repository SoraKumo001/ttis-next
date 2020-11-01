import { Injectable, OnModuleInit } from '@nestjs/common';
import { User } from './user';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { GraphQLFeald } from '@libs/graphQLTools';
import { getSHA256 } from '@libs/hashTools';

@Injectable()
export class UserService implements OnModuleInit {
  constructor(
    @InjectRepository(User)
    private readonly rep: Repository<User>,
  ) {}
  async onModuleInit() {
    const { rep } = this;
    return rep.manager.connection.transaction(async () => {
      return rep.count().then((count) => {
        if (!count) {
          return rep.save({ name: 'admin', password: getSHA256('') });
        }
      });
    });
  }
  async setUser(id?: number, name?: string, password?: string, info?: unknown) {
    const { rep } = this;
    if (!id) {
      if (name && password) {
        return rep.save({
          name,
          password: getSHA256(password),
          info: info && JSON.stringify(info),
        });
      }
    } else {
      const user = await rep.findOne(id);
      if (user) {
        if (name) user.name = name;
        if (password) user.password = getSHA256(password);
        return user.save();
      }
    }
    return null;
  }
  async users(fields?: GraphQLFeald) {
    const { rep } = this;
    return rep.find({
      select: fields as (keyof User)[],
      where: { enable: true },
      order: { id: 'ASC' },
    });
  }
  async deleteUser(id: number) {
    const { rep } = this;
    return !!(await rep.update(id, { enable: false }));
  }

  async deleteUsers(ids: number[]) {
    const { rep } = this;
    return !!(await rep.update(ids, { enable: false }));
  }
  async login(name: string, password: string) {
    const { rep } = this;
    const passwordHash = getSHA256(password);
    return await rep.findOne({
      where: { name, password: passwordHash, enable: true },
    });
  }
  async validateUser(id: number, password: string) {
    const { rep } = this;
    return await rep.findOne({
      where: { id, password, enable: true },
    });
  }
}
