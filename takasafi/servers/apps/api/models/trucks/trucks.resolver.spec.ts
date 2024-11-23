import { Test, TestingModule } from '@nestjs/testing';
import { TrucksResolver } from './trucks.resolver';

describe('TrucksResolver', () => {
  let resolver: TrucksResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TrucksResolver],
    }).compile();

    resolver = module.get<TrucksResolver>(TrucksResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
