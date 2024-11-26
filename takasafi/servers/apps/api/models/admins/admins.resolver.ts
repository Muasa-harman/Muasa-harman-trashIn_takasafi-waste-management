import { Resolver,Query,Mutation,Args,ResolveField,Parent } from '@nestjs/graphql';
import { AdminsService } from './admins.service';
import { Admin } from './entity/admin.entity';
import { FindManyAdminArgs,FindUniqueAdminArgs } from './dto/find.args';
import { CreateAdminInput } from './dto/create-admin.input';
import {UpdateAdminInput} from './dto/create-admin.input';
import { checkRowLevelPermission } from 'common/auth/util';
import { GetUserType } from 'common/types';
import { AllowAuthenticated,GetUser } from 'common/auth/auth.decorator';
import { PrismaService } from 'common/prisma/prisma.service';
import { User } from 'models/users/entity/user.entity';
import { Verification } from 'models/verifications/entity/verification.entity';
import { AdminWhereInput } from './dto/where.args';

@AllowAuthenticated('admin')
@Resolver(()=>Admin)
export class AdminsResolver {
    constructor(
        private readonly adminService:AdminsService,
        private readonly prisma:PrismaService,
    ){}

    @Mutation(()=>Admin)
    createAdmin(@Args('createAdminInput')
    @Args('createAdminInput') args:CreateAdminInput,
    @GetUser() user:GetUserType,
    ){
    checkRowLevelPermission(user,args.uid)
    return this.adminService.create(args)
    }
    @Query(()=>[Admin],{name:'admins'})
    findAll(@Args() args:FindManyAdminArgs){
        return this.adminService.findAll(args)
    }
    @Query(()=>Admin,{name:'admin'})
    findOne(@Args() args:FindUniqueAdminArgs){
        return this.adminService.findOne(args)
    }
    @AllowAuthenticated()
    @Query(()=>Admin,{name:'adminMe'})
    adminMe(@GetUser() user:GetUserType){
        return this.adminService.findOne({where: {uid: user.uid}})
    }

    @AllowAuthenticated()
    @Mutation(()=>Admin)
    async updateAdmin(
        @Args('updateAdminInput') args:UpdateAdminInput,
        @GetUser() user:GetUserType,
    ){
        const admin = await this.prisma.admin.findUnique({
            where:{uid:args.uid},
        })
        checkRowLevelPermission(user,admin.uid)
        return this.adminService.update(args)
    }
    @Mutation(()=>Admin)
    async removeAdmin(@Args() args:FindUniqueAdminArgs,
    @GetUser() user: GetUserType,
    ){
        const admin = await this.prisma.admin.findUnique(args)
        checkRowLevelPermission(user, admin.uid)
        return this.adminService.remove(args)
    }
    @ResolveField(()=>User,{nullable: true})
    user(@Parent() admin:Admin){
        return this.prisma.user.findUnique({where: {uid: admin.uid}})
    }

    @ResolveField(()=>[Verification])
    Verifiations(@Parent() parent:Admin){
        return this.prisma.verification.findMany({
            where:{adminId:parent.uid}
        })
    }

    @ResolverField(()=>Number)
    async VerificationsCount(@Parent() parent:Admin){
        return this.prisma.verification.count({
            where:{adminId:parent.uid},
        })
    }

    @Query(()=>Number,{
        name: 'adminsCount',
    })
    async adminsCount(
        @Args('where',{nullable:true})
        where:AdminWhereInput,
    ){
        return this.prisma.admin.count({
            where,
        })
    }
}
