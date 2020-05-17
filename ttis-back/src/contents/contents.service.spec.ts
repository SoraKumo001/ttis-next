/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Test, TestingModule } from '@nestjs/testing';
import { ContentsService } from './contents.service';
import { Contents } from './contents';
import { DBModule2 } from '../db.module';
import { ContentsModule } from './contents.module';
import { ObjectMask } from '@test/testTools';

const masks = {
  id: '',
  parentId: '',
  createAt: '',
  updateAt: '',
};

describe('ContentsService', () => {
  let service: ContentsService;
  let contents: Contents|null;
  let parentId:string;
  let module: TestingModule;
  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [DBModule2, ContentsModule],
    }).compile();

    service = module.get<ContentsService>(ContentsService);
    await module.init();
  });
  afterAll(async () => {
    await module.close();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('List Contents first', async () => {
    contents = (await service.contentsTree())!;
    expect(ObjectMask(contents, masks)).toMatchSnapshot();
  });
  it('Create & update', async () => {
    parentId = (await service.create({ parentId: contents!.id }))!.id;
    await service.update({
      id: parentId,
      title: 'タイトル0',
      value: '<div>内容1</div>',
      visible: true,
    });
    expect(!!parentId).toMatchSnapshot();
  });
  it('Get Contents', async () => {
    const contents = (await service.contents({id:parentId}));
    expect(contents?.title).toMatchSnapshot();
  });
  it('Next', async () => {
    const id = (
      await service.create({
        parentId,
        title: 'Next',
        visible: true,
      })
    )!.id;
    for (let i = 0; i < 2; i++) {
      await service.create({
        parentId: id,
        vector: 'NEXT',
        title: `Next ${i}`,
        value: `<div>内容${i}</div>`,
        visible: true,
      });
    }
  });
  it('Before', async () => {
    const id = (
      await service.create({
        parentId,
        title: 'Before',
        visible: true,
      })
    )!.id;
    for (let i = 0; i < 2; i++) {
      await service.create({
        parentId: id,
        vector: 'BEFORE',
        title: `Before ${i}`,
        value: `<div>内容${i}</div>`,
        visible: true,
      });
    }
  });
  it('ChildLast', async () => {
    const id = (
      await service.create({
        parentId,
        title: 'ChildLast',
        visible: true,
      })
    )!.id;
    for (let i = 0; i < 2; i++) {
      await service.create({
        parentId: id,
        vector: 'CHILD_LAST',
        title: `ChildLast ${i}`,
        value: `<div>内容${i}</div>`,
        visible: true,
      });
    }
  });
  it('ChildFirst', async () => {
    const id = (
      await service.create({
        parentId,
        title: 'ChildFirst',
        visible: true,
      })
    )!.id;
    for (let i = 0; i < 2; i++) {
      await service.create({
        parentId: id,
        vector: 'CHILD_FIRST',
        title: `ChildFirst ${i}`,
        value: `<div>内容${i}</div>`,
        visible: true,
      });
    }
  });

  // it('List Contents', async () => {
  //   const contents = await service.contents();
  //   expect(ObjectMask(contents, masks)).toMatchSnapshot();
  // });
  it('List ContentsTree', async () => {
    contents = await service.contentsTree();
    expect(contents).toBeDefined();
    expect(ObjectMask(contents, masks)).toMatchSnapshot();
  });

  it('List ContentsTree(set visible)', async () => {
    contents = await service.contentsTree({
      visible: true,
      select: ['title', 'id'],
    });
    expect(ObjectMask(contents, masks)).toMatchSnapshot();
  });

  //階層テスト
  it('List ContentsTree(set level)', async () => {
    const getLevel = (contents: Contents, level?: number):number => {
      if (level === undefined) level = 1;
      return (
        contents.children?.reduce(
          (lv, contents) => Math.max(getLevel(contents, level! + 1), lv),
          level,
        ) || level
      );
    };
    for (let i = 1; i <= 3; i++) {
      contents = await service.contentsTree({
        level: i,
        select: ['title', 'id'],
      });
      expect(getLevel(contents!)).toEqual(i);
    }
  });
});
