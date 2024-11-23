import { Test, TestingModule } from '@nestjs/testing';
import { DriverAssignmentsService } from './driver-assignments.service';

describe('DriverAssignmentsService', () => {
  let service: DriverAssignmentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DriverAssignmentsService],
    }).compile();

    service = module.get<DriverAssignmentsService>(DriverAssignmentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
