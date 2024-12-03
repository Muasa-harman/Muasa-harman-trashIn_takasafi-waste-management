import { Test, TestingModule } from '@nestjs/testing';
import { MunicipleService } from './municiple.service';

describe('MunicipleService', () => {
  let service: MunicipleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MunicipleService],
    }).compile();

    service = module.get<MunicipleService>(MunicipleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
