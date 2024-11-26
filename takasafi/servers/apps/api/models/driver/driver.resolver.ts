import { Resolver,Query,Mutation,Args } from '@nestjs/graphql';
import { DriverService } from './driver.service';
import { Driver } from './entity/driver.entity';
import { FindManyDriverArgs,FindUniqueDriverArgs } from './dto/find.args';
import { CreateDriverInput } from './dto/create-driver.input';
import { UpdateDriverInput } from './dto/update-driver.input';
import { checkRowLevelPermission } from 'common/auth/util';
import { GetUserType } from 'common/types';
import { AllowAuthenticated,GetUser } from 'common/auth/auth.decorator';
import { PrismaService } from 'common/prisma/prisma.service';
import { DriverWhereInput } from './dto/where.args';
import { Booking } from 'models/bookings/entity/booking.entity';
import { PaginationInput } from 'common/dtos/common.input';
import {BookingStatus} from '@prisma/client'
import { BadGatewayException } from '@nestjs/common';

@Resolver(()=>Driver)
export class DriverResolver {
    constructor(
        private readonly driverService:DriverService,
        private readonly prisma:PrismaService,
    ){}

    @AllowAuthenticated()
    @Mutation(()=>Driver)
    async createDriver(
        @Args('createDriveInput') args:CreateDriverInput,
        @GetUser() user: GetUserType,
    ){
        const company = await this.prisma.company.findFirst({
            where:{Managers: {some:{uid:user.uid}}},
        })
        if(!company){
            throw new BadGatewayException('You do not have a company')
        }
        return this.driverService.create({...args,companyId:company.id})
    }
    @Query(()=>[Driver], {name:'drivers'})
    findAll(@Args() args: FindManyDriverArgs){
        return this.driverService.findAll(args)
    }

    @AllowAuthenticated()
    @Mutation(()=>Booking)
    async assignDriver(
        @Args('bookingId') bookingId: number,
        @Args('status') status:BookingStatus,
        @GetUser() user: GetUserType,
    ){
        const booking = await this.prisma.booking.findUnique({
            where:{id:bookingId},
            select:{
                Truck:{
                    select:{
                        Company:{select:{Managers:true,Drivers:true}},
                    }
                }
            }
        })
        checkRowLevelPermission(user,[
            ...booking.Truck.Company.Managers.map((manager)=>manager.id),
            ...booking.Truck.Company.Drivers.map((driver)=>driver.uid),
        ])
        const [updatedBooking,bookingTimeline] = await this.prisma.$transaction([
            this.prisma.booking.update({
                where:{id:bookingId},
                data:{
                    status,
                    ...(status === BookingStatus.DRIVER_ASSIGNED_FOR_CHECK_IN && {
                        driverAssignment:{
                            update:{pickupDriverId:user.uid}
                        },
                    }),
                }
            }),
            this.prisma.bookingTimeline.create({
                data:{
                    bookingId,driverId:user.uid,status
                }
               })
        ])
        return updatedBooking
    }

    @AllowAuthenticated('manager','admin')
    @Query(()=>[Driver], {name:'companyDrivers'})
    async companyDrivers(
        @Args() args:FindManyDriverArgs,
        @GetUser() user: GetUserType,
    ){
        const company = await this.prisma.company.findFirst({
            where:{Managers: {some:{uid:user.uid}}},
        })
    }

    @AllowAuthenticated()
    @Query(()=>Number)
    async companyDriversTotal(
        @Args('where',{nullable:true}) where:DriverWhereInput,
        @GetUser() user:GetUserType,
    ){
        const company = await this.prisma.company.findFirst({
            where: {Manager: {some:{uid:user.uid}}},
        })
        return this.prisma.driver.count({
            where:{...where,companyId:{equals:company.id}},
        })
    }
    @Query(()=>Driver,{name:'driver'})
    findOne(@Args() args:FindUniqueDriverArgs){
        return this.driverService.findOne(args)
    }
    @AllowAuthenticated()
    @Query(()=>Driver,{name:'driverMe', nullable:true})
    driverMe(@GetUser() user:GetUserType){
        return this.driverService.findOne({where:{uid:user.uid}})
    }
    @AllowAuthenticated('driver')
    @Query(()=>[Booking], {name:'driverPickups'})
    async driverPickups(
        @Args(){skip,take} :PaginationInput,
        @GetUser() user:GetUserType,
    ){
        const driver = await this.driverService.validDriver(user.uid)
        return this.prisma.booking.findMany({
            skip,take,where:{
                Truck:{
                    companyId:driver.companyId
                },
                DriverAssignment:{
                    pickupLat:{not:undefined},
                    pickupDriverId:null,
                },
            },
        })
    }
}
