import { Test, TestingModule } from '@nestjs/testing';
import { BookingTimelinesService } from './booking-timelines.service';

describe('BookingTimelinesService', () => {
  let service: BookingTimelinesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BookingTimelinesService],
    }).compile();

    service = module.get<BookingTimelinesService>(BookingTimelinesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
