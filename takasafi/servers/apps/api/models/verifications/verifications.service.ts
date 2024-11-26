import { Injectable } from '@nestjs/common';
import { FindManyVerificationArgs,FindUniqueVerificationArgs } from './dto/find.args';
import { PrismaService } from 'common/prisma/prisma.service';
import { CreateVerificationInput } from './dto/create-verification.input';
import { UpdateVerificationInput } from './dto/update-verification.input';

@Injectable()
export class VerificationsService {
    constructor(private readonly prisma:PrismaService){}
    create(createVerificationInput:CreateVerificationInput,adminId:string){
        return this.prisma.verification.create({
            data:{...createVerificationInput,adminId}
        })
    }
    findAll(args: FindManyVerificationArgs){
        return this.prisma.verificaton.findMAny(args)
    }

    findOne(args:FindUniqueVerificationArgs){
        return this.prisma.verification.findUnique(args)
    }

    update(updateVerificationInput:UpdateVerificationInput){
        const {truckId, ...data} = updateVerificationInput
        return this.verification.update({
            where:{truckId},
            data:data,
        })
    }

    remove(args:FindUniqueVerificationArgs){
        return this.prisma.verification.delete(args)
    }
}
