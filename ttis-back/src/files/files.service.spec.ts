import { Test, TestingModule } from '@nestjs/testing';
import { FilesService } from './files.service';
import { DBModule2 } from 'src/db.module';
import { FilesModule } from './files.module';

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
});
