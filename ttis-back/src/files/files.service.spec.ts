import { Test, TestingModule } from '@nestjs/testing';
import { FilesService } from './files.service';
import { DBModule2 } from 'src/db.module';
import { FilesModule } from './files.module';
import { ObjectMask } from '@test/testTools';

const masks = {
  id: '',
  parentId: '',
  createAt: '',
  updateAt: '',
};

describe('FileService', () => {
  let service: FilesService;
  let module: TestingModule;
  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [DBModule2, FilesModule],
    }).compile();
    await module.init();

    service = module.get<FilesService>(FilesService);
  });
  afterAll(async () => {
    await module.close();
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('Create dir', async () => {
    const dir = await service.createDir(undefined,"test");
    expect(dir).toBeDefined();
    const dir2 = await service.createDir(undefined,"test");
    expect(dir2).toEqual(null);
  });
  it('List Contents first', async () => {
    const list = await service.getDirList();
    expect(ObjectMask(list, masks)).toMatchSnapshot();
  });
});
