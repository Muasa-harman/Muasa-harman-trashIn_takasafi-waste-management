import { Injectable } from '@nestjs/common';
import { FindManyAdminArgs,FindUniqueAdminArgs } from './dto/find.args';
import { PrismaService } from 'common/prisma/prisma.service';
import { CreateAdminInput } from './dto/create-admin.input';
import { UpdateAdminInput } from './dto/update-admin.input';

@Injectable()
export class AdminsService {
    constructor(
        private readonly prisma:PrismaService
    ){}
    create(createAdminInput:CreateAdminInput){
        return this.prisma.admin.create({
            data:createAdminInput,
        })
    }
    findAll(args: FindManyAdminArgs){
        return this.prisma.admin.findMany(args)
    }
    findOne(args:FindUniqueAdminArgs){
        return this.prisma.admin.findMany(args)
    }
    update(updateAdminInput:UpdateAdminInput){
        const {uid,...data} = updateAdminInput
        return this.prisma.admin.update({
            where:{uid},
            data:data
        })
    }
    remove(args: FindUniqueAdminArgs){
        return this.prisma.admin.delete(args)
    }
}
