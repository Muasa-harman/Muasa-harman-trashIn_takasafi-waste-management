import { Resolver,Query,Mutation,Args,Parent } from '@nestjs/graphql';
import { BookingsService } from './bookings.service';
import { Booking } from './entity/booking.entity';


@Resolver()
export class BookingsResolver {}
