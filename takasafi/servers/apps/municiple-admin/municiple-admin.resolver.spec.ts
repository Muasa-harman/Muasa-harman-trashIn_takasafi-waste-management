import { Test, TestingModule } from '@nestjs/testing';
import { MunicipleAdminResolver } from './municiple-admin.resolver';

describe('MunicipleAdminResolver', () => {
  let resolver: MunicipleAdminResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MunicipleAdminResolver],
    }).compile();

    resolver = module.get<MunicipleAdminResolver>(MunicipleAdminResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
