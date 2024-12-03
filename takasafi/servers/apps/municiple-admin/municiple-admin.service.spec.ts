import { Test, TestingModule } from '@nestjs/testing';
import { MunicipleAdminService } from './municiple-admin.service';

describe('MunicipleAdminService', () => {
  let service: MunicipleAdminService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MunicipleAdminService],
    }).compile();

    service = module.get<MunicipleAdminService>(MunicipleAdminService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
