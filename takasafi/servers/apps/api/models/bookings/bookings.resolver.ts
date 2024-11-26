import { Resolver,Query,Mutation,Args,Parent, ResolveField } from '@nestjs/graphql';
import { BookingsService } from './bookings.service';
import { Booking } from './entity/booking.entity';
import { FindManyBookingArgs,FindUniqueBookingArgs } from './dto/find.args';
import { CreateBookingInput } from './dto/create-booking.input';
import { UpdateBookingInput } from './dto/update-booking.input';
import { checkRowLevelPermission } from 'common/auth/util';
import { GetUserType } from 'common/types';
import { AllowAuthenticated,GetUser } from 'common/auth/auth.decorator';
import { PrismaService } from 'common/prisma/prisma.service';
import { Customer } from 'models/customers/entity/customer.entity';
import { DriverAssignment } from 'models/driver-assignments/entity/create-valet-assignment';
import { AggregateCountOutput, StringFilter } from 'common/dtos/common.input';
import { BookingWhereInput } from './dto/where.args';
import { BookingTimeline } from 'models/booking-timelines/entity/booking-timeline.entity';
import { BadRequestException, Get } from '@nestjs/common';
import { equal } from 'assert';
import { constrainedMemory } from 'process';

@Resolver()
export class BookingsResolver {
    constructor(
        private readonly bookingsService:BookingsService,
        private readonly prisma:PrismaService,
    ){}
    @AllowAuthenticated()
    @Mutation(()=>Booking)
    createBooking(
        @Args('createBookingInput') args: CreateBookingInput,
        @GetUser() user: GetUserType,
    ){
        checkRowLevelPermission(user,args.customerId)
        return this.bookingsService.create(args)
    }
    @AllowAuthenticated('admin')
    @Query(()=>[Booking],{name:'bookingsForDriver'})
    async bookingsForDriver(
        @Args() args:FindManyBookingArgs,
        @GetUser() user:GetUserType,
    ){
        const company = await this.prisma.company.findFirst({
            where: {Drivers: {some: {uid: user.uid}}}
        })
        return this.bookingsService.findAll({
            ...args,
            where:{
                ...args.where,
                vehicleNumber: {is:{companyId:{equals:company.id}}}
            }
        })
    }
    @AllowAuthenticated()
    @Query(()=>[Booking], {name:'bookingForCustomer'})
    bookingsForCustomer(
        @Args() args:FindManyBookingArgs,
        @GetUser() user:GetUserType,
    ){
        return this.bookingsService.findAll({
            ...args,
            where:{...args.where,customerId:{
                equals: user.uid,
                notIn: []
            }}
        })
    }
    @AllowAuthenticated('manager','admin')
    @Query(()=>[Booking],{name:'bookingsForTruck'})
    async bookingsForTruck(
        @Args()
        {cursor,distinct,orderBy,skip,take,where}:FindManyBookingArgs,
        @GetUser() user:GetUserType,
    ){
        const truckId = where.Trucks.is.truckId.equals
        if(!truckId){
            throw new BadRequestException('Pass truck id in where truck is truckId')
        }
        const truck = await this.prisma.truck.findUnique({
            where:{id:truckId},
            include:{Company:{include:{Managers:true}}},
        })
        checkRowLevelPermission(
            user,truck.company.Manager.map((manager)=>manager.uid),
        )
        return this.bookingsService.findAll({
            cursor,distinct,orderBy,skip,take,where:{
                ...where,Trucks:{
                    is: { truckId: { equals: truckId } },
                    notIn: []
                }
            }
        })
    }
    @Query(()=>AggregateCountOutput)
    async bookingsCount(
        @Args('where',{nullable:true})
        where:BookingWhereInput,
    ){
        const bookings = await this.prisma.booking.aggregate({
            where,
            _count: {_all:true}
        })
        return {count: bookings._count._all}
    }
    @Query(()=>Booking,{name:'booking'})
    findOne(@Args() args: FindUniqueBookingArgs){
        return this.bookingsService.findOne(args)
    }

    @AllowAuthenticated()
    @Mutation(()=>Booking)
    async updateBooking(
        @Args('updateBookingInput') args: UpdateBookingInput,
        @GetUser() user: GetUserType,
    ){
        const booking = await this.prisma.booking.findUnique({
            where:{id:args.id},
        })
        checkRowLevelPermission(user, booking.customerId)
        return this.bookingsService.update(args)
    }
    @AllowAuthenticated()
    @Mutation(()=>Booking)
    async removeBooking(
        @Args() args:FindUniqueBookingArgs,
        @GetUser() user: GetUserType,
    ){
        const booking = await this.prisma.booking.findUnique(args)
        return this.bookingsService.remove(args)
    }

    @ResolveField(()=>Customer)
    customer(@Parent() booking:Booking){
        return this.prisma.customer.findFirst({
            where:{uid:Booking.customerId}
        })
    }

    @ResolveField(()=>[BookingTimeline])
    bookingTimeline(@Parent() booking: Booking){
        return this.prisma.bookingTimline.findMany({
            where:{bookingId:booking.id},
        })
    }

    @ResolveField(()=>DriverAssignment,{nullable:true})
    DriverAssignment(@Parent() booking:Booking){
        return this.prisma.DriverAssignment.findFirst({
            where:{bookingId:booking.id},
        })
    }
}
