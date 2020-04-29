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
  let contents: Contents;
  let parentId;
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
  it('List Contents', async () => {
    contents = await service.contents();
    expect(ObjectMask(contents, masks)).toMatchSnapshot();
  });
  it('Create', async () => {
    parentId = (await service.create(contents.id, 'CHILD_FIRST', true)).id;
    expect(!!parentId).toMatchSnapshot();
  });
  it('Create & update', async () => {
    let id: string;
    id = (await service.create(parentId, 'CHILD_LAST', true)).id;
    await service.update({ id, title: 'タイトル1', value: '<div>内容1</div>' });
    id = (await service.create(parentId, 'CHILD_FIRST', true)).id;
    await service.update({ id, title: 'タイトル2', value: '<div>内容2</div>' });
    id = (await service.create(parentId, 'CHILD_LAST', true)).id;
    await service.update({ id, title: 'タイトル3', value: '<div>内容3</div>' });
    id = (await service.create(parentId, 'CHILD_FIRST', true)).id;
    await service.update({ id, title: 'タイトル4', value: '<div>内容4</div>' });

    id = (await service.create(parentId, 'NEXT', true)).id;
    await service.update({
      id,
      title: 'タイトル10',
      value: '<div>内容1</div>',
    });
    id = (await service.create(parentId, 'BEFORE', true)).id;
    await service.update({
      id,
      title: 'タイトル20',
      value: '<div>内容2</div>',
    });
    id = (await service.create(parentId, 'NEXT', true)).id;
    await service.update({
      id,
      title: 'タイトル30',
      value: '<div>内容3</div>',
    });
    id = (await service.create(parentId, 'BEFORE', true)).id;
    await service.update({ id, title: 'タイト40', value: '<div>内容4</div>' });

    expect(!!contents.priority).toMatchSnapshot();
  });
  it('List Contents', async () => {
    contents = await service.contents();
    expect(ObjectMask(contents, masks)).toMatchSnapshot();
  });
});
