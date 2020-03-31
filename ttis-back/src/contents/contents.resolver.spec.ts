import { Test, TestingModule } from '@nestjs/testing';
import { ContentsResolver } from './contents.resolver';

describe('ContentsResolver', () => {
  let resolver: ContentsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContentsResolver],
    }).compile();

    resolver = module.get<ContentsResolver>(ContentsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
