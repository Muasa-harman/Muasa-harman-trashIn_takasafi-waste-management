import { Test, TestingModule } from '@nestjs/testing';
import { TruckRouteService } from './truck-route.service';

describe('TruckRouteService', () => {
  let service: TruckRouteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TruckRouteService],
    }).compile();

    service = module.get<TruckRouteService>(TruckRouteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
