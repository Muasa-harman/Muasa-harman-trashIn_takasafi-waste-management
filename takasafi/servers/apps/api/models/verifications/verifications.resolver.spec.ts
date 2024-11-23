import { Test, TestingModule } from '@nestjs/testing';
import { VerificationsResolver } from './verifications.resolver';

describe('VerificationsResolver', () => {
  let resolver: VerificationsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VerificationsResolver],
    }).compile();

    resolver = module.get<VerificationsResolver>(VerificationsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
