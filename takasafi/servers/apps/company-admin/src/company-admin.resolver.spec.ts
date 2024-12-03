import { Test, TestingModule } from '@nestjs/testing';
import { CompanyAdminResolver } from './company-admin.resolver';

describe('CompanyAdminResolver', () => {
  let resolver: CompanyAdminResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompanyAdminResolver],
    }).compile();

    resolver = module.get<CompanyAdminResolver>(CompanyAdminResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
