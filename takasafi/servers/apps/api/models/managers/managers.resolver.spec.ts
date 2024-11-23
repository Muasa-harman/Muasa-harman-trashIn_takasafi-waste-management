import { Test, TestingModule } from '@nestjs/testing';
import { ManagersResolver } from './managers.resolver';

describe('ManagersResolver', () => {
  let resolver: ManagersResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ManagersResolver],
    }).compile();

    resolver = module.get<ManagersResolver>(ManagersResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
