import { Module } from '@nestjs/common';
import { BookingTimelinesService } from './booking-timelines.service';
import { BookingTimelinesResolver } from './booking-timelines.resolver';

@Module({
  providers: [BookingTimelinesService, BookingTimelinesResolver],
  exports:[BookingTimelinesService]
})
export class BookingTimelinesModule {}
