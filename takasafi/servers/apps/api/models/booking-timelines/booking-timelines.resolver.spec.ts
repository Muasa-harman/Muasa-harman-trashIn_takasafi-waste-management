import { Test, TestingModule } from '@nestjs/testing';
import { BookingTimelinesResolver } from './booking-timelines.resolver';

describe('BookingTimelinesResolver', () => {
  let resolver: BookingTimelinesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BookingTimelinesResolver],
    }).compile();

    resolver = module.get<BookingTimelinesResolver>(BookingTimelinesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
