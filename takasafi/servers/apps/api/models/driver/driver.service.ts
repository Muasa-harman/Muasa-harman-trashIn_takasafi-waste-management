import { Injectable,BadRequestException } from '@nestjs/common';
import { FindManyDriverArgs,FindUniqueDriverArgs } from './dto/find.args';
import { PrismaService } from 'common/prisma/prisma.service';
import { CreateDriverInput } from './dto/create-driver.input';
import { UpdateDriverInput } from './dto/update-driver.input';

@Injectable()
export class DriverService {
    constructor(
        private readonly prisma:PrismaService
    ){}
    create(createDriverInput:CreateDriverInput){
        return this.prisma.driver.create({
            data:createDriverInput,
        })
    }

    findAll(args: FindManyDriverArgs){
        return this.prisma.driver.findMany(args)
    }
    findOne(args: FindUniqueDriverArgs){
        return this.prisma.driver.findUnique(args)
    }
    update(updateDriverInput:UpdateDriverInput){
        const {uid, ...data} = updateDriverInput
        return this.prisma.driver.update({
            where:{uid},
            data:data,
        })
    }
    remove(args:FindUniqueDriverArgs){
        return this.prisma.driver.delete(args)
    }

    async validDriver(uid:string){
        const driver = await this.prisma.driver.findUnique({
            where:{uid:uid},
        })
        if(!driver){
            throw new BadRequestException('You are not a driver.')
        }
        return driver
    }
}
