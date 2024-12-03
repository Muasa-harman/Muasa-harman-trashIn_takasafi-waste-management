import { Test, TestingModule } from '@nestjs/testing';
import { MunicipleResolver } from './municiple.resolver';

describe('MunicipleResolver', () => {
  let resolver: MunicipleResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MunicipleResolver],
    }).compile();

    resolver = module.get<MunicipleResolver>(MunicipleResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
