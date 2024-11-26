import { Resolver,Query,Mutation,Args } from '@nestjs/graphql';
import { BookingTimelinesService } from './booking-timelines.service';
import { BookingTimeline } from './entity/booking-timeline.entity';
import { FindManyBookingTimelineArgs,FindUniqueBookingTimelineArgs } from './dto/find.args';
import { CreateBookingTimelineInput } from './dto/create-booking-timeline.input';
import { UpdateBookingTimelineInput } from './dto/update-booking-timeline.input';
import { AllowAuthenticated, GetUser } from 'common/auth/auth.decorator';
import { PrismaService } from 'common/prisma/prisma.service';
import { GetUserType } from 'common/types';
import { checkRowLevelPermission } from 'common/auth/util';

@Resolver()
export class BookingTimelinesResolver {
    constructor(
        private readonly bookingTimelineService:BookingTimelinesService,
        private readonly prisma: PrismaService,
    ){}

    @AllowAuthenticated('admin','manager')
    @Mutation(()=>BookingTimeline)
    async createBookingTimeline(
        @Args('createBookingTimelineInput')
        {bookingId, status}:CreateBookingTimelineInput,
        @GetUser() user: GetUserType,
    ){
        const booking = await this.prisma.booking.findUnique({
            where:{id:bookingId},
            select:{
                Truck:{
                    select:{
                        Company:{
                            select:{Managers: {select:{uid:true}}},
                        }
                    }
                }
            }
        })
        checkRowLevelPermission(
            user,booking.Truck.Company.Managers.map((manager) => manager.uid),
        )
        const [updateBooking,bookingTimeline] = await this.prisma.$transaction([
            this.prisma.booking.update({
                data:{status:status},
                where:{id:bookingId}
            }),
            this.prisma.bookingTimeline.create({
                data:{bookingId,managerId:user.uid,status},
            }),
        ])
        return bookingTimeline
    }
    @Query(()=>[BookingTimeline],{name:'bookingTimeline'})
    findAll(@Args() args:FindManyBookingTimelineArgs){
        return this.bookingTimelineService.findAll(args)
    }

    @Query(()=>BookingTimeline,{name:'bookingTimeline'})
    findOne(@Args() args:FindUniqueBookingTimelineArgs){
        return this.bookingTimelineService.findOne(args)
    }

    @AllowAuthenticated('admin')
    @Mutation(()=>BookingTimeline)
    async updateBookingTimeline(
        @Args('updateBookingTimelineInput') args:UpdateBookingTimelineInput,
    ){
        return this.bookingTimelineService.update(args)
    }
    @AllowAuthenticated('admin')
    @Mutation(()=>BookingTimeline)
    async removeBookingTimeline(@Args() args:FindUniqueBookingTimelineArgs){
        return this.bookingTimelineService.remove(args)
    }
}
