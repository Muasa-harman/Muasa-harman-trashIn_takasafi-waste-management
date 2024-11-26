import { Injectable,NotFoundException } from '@nestjs/common';
import { FindManyBookingArgs,FindUniqueBookingArgs } from './dto/find.args';
import { PrismaService } from 'common/prisma/prisma.service';
import { CreateBookingInput } from './dto/create-booking.input';
import { UpdateBookingInput } from './dto/update-booking.input';
import { generateSixDigitNumber } from 'common/util';


@Injectable()
export class BookingsService {
    constructor(
        private readonly prisma:PrismaService
    ){}
    async create({customerId,collectionDay,truckId,type,vehicleNumber,phoneNumber,specialPrice,normalPrice,DriverAssignment}:
        CreateBookingInput
    ){
        const customer = await this.prisma.customer.findUnique({
            where:{uid: customerId},
        })

        if(!customer?.uid){
            await this.prisma.customer.create({
                data:{uid:customerId}
            })
        }
        const passcode = generateSixDigitNumber().toString()

        let collectionDay:Date

        if(typeof collectionDay === 'string'){
            collectionDay = new Date(collectionDay)
        }

        return this.prisma.$transaction(async (tx)=>{
            const booking = await tx.booking.create({
                data:{
                    collectionDay: new Date(collectionDay).toISOString(),
                    vehicleNumber,
                    customerId,
                    phoneNumber,
                    passcode,
                    ...(DriverAssignment? {DriverAssignment:{create:DriverAssignment}} : null),
                },
            })
            await tx.bookingTimeline.create({
                data:{bookingId: booking.id,status:'BOOKED'},
            })
            return booking
        })
    }
    findAll(args:FindManyBookingArgs){
        return this.prisma.booking.findMany(args)
    }
    findOne(args:FindUniqueBookingArgs){
        return this.prisma.booking.findUnique(args)
    }
    update(updateBookingInput:UpdateBookingInput){
        const {id,...data} = updateBookingInput
        return this.prisma.booking.update({
            where:{id},
            data:data,
        })
    }
    remove(args:FindUniqueBookingArgs){
        return this.prisma.booking.delete(args)
    }
    
}
