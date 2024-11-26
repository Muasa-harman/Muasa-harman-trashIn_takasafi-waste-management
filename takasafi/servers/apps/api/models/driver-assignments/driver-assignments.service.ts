import { Injectable } from '@nestjs/common';
import { PrismaService } from 'common/prisma/prisma.service';
import { CreateDriverAssignmentInput } from './dto/create-driver-assignment.input';
import { FindManyDriverAssignmentArgs, FindUniqueDriverAssignmentArgs } from './dto/find.args';
import { UpdateDriverAssignmentInput } from './dto/update-driver-assignment.input';

@Injectable()
export class DriverAssignmentsService {
    constructor(
        private readonly prisma:PrismaService
    ){}
    create(createDriverAssignmentInput:CreateDriverAssignmentInput){
        return this.prisma.driverAssignment.create({
            data:createDriverAssignmentInput,
        })
    }
    findAll(args:FindManyDriverAssignmentArgs){
        return this.prisma.driverAssignment.findMany(args)
    }
    findOne(args: FindUniqueDriverAssignmentArgs){
        return this.prisma.driverAssignment.delete(args)
    }

    update(updateDriverAssignmentInput:UpdateDriverAssignmentInput){
        const {bookingId,...data} = updateDriverAssignmentInput
        return this.prisma.driverAssignment.update({
            where:{bookingId},
            data:data,
        })
    }

    remove(args:FindUniqueDriverAssignmentArgs){
        return this.prisma.driverAssignment.delete(args)
    }
}
