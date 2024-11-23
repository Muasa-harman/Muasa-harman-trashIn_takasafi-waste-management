import { Module } from '@nestjs/common';
import { BookingTimelinesService } from './booking-timelines.service';
import { BookingTimelinesResolver } from './booking-timelines.resolver';

@Module({
  providers: [BookingTimelinesService, BookingTimelinesResolver]
})
export class BookingTimelinesModule {}
