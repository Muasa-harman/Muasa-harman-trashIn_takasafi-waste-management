import { Injectable } from '@nestjs/common';
import { FindManyBookingTimelineArgs,FindUniqueBookingTimelineArgs } from './dto/find.args';
import { PrismaService } from 'common/prisma/prisma.service';
import { CreateBookingTimelineInput } from './dto/create-booking-timeline.input';
import { UpdateBookingTimelineInput } from './dto/update-booking-timeline.input';

@Injectable()
export class BookingTimelinesService {
    constructor(
        private readonly prisma:PrismaService
    ){}
    create(createBookingTimelineInput:CreateBookingTimelineInput){
        return this.prisma.bookingTimeline.create({
            data:createBookingTimelineInput,
        })
    }
    findAll(args:FindManyBookingTimelineArgs){
        return this.prisma.bookingTimeline.findMany(args)
    }
    findOne(args: FindUniqueBookingTimelineArgs){
        return this.prisma.bookingTimeline.findUnique(args)
    }
    update(updateBookingTimelineInput:UpdateBookingTimelineInput){
        const {id,...data} = updateBookingTimelineInput
        return this.prisma.bookingTimeline.update({
            where:{id},
            data: data
        })
    }
    remove(args:FindUniqueBookingTimelineArgs){
        return this.prisma.bookingTimeline.delete(args)
    }
}
