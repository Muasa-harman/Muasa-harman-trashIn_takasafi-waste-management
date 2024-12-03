import { Test, TestingModule } from '@nestjs/testing';
import { TruckResolver } from './truck.resolver';

describe('TruckResolver', () => {
  let resolver: TruckResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TruckResolver],
    }).compile();

    resolver = module.get<TruckResolver>(TruckResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
