import { Test, TestingModule } from '@nestjs/testing';
import { DriverAssignmentsResolver } from './driver-assignments.resolver';

describe('DriverAssignmentsResolver', () => {
  let resolver: DriverAssignmentsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DriverAssignmentsResolver],
    }).compile();

    resolver = module.get<DriverAssignmentsResolver>(DriverAssignmentsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
