import { Test, TestingModule } from '@nestjs/testing';
import { TruckRouteResolver } from './truck-route.resolver';

describe('TruckRouteResolver', () => {
  let resolver: TruckRouteResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TruckRouteResolver],
    }).compile();

    resolver = module.get<TruckRouteResolver>(TruckRouteResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
