import { Resolver,ResolveField,Parent,Query,Mutation,Args } from '@nestjs/graphql';
import { DriverAssignmentsService } from './driver-assignments.service';
import { DriverAssignment } from './entity/create-valet-assignment';
import { FindManyDriverAssignmentArgs,FindUniqueDriverAssignmentArgs } from './dto/find.args';
import { CreateDriverAssignmentInput } from './dto/create-driver-assignment.input';
import { UpdateDriverAssignmentInput } from './dto/update-driver-assignment.input';
import { checkRowLevelPermission } from 'common/auth/util';
import { GetUserType } from 'common/types';
import { AllowAuthenticated,GetUser } from 'common/auth/auth.decorator';
import { PrismaService } from 'common/prisma/prisma.service';
import { Driver } from 'models/driver/entity/driver.entity'; 

@Resolver(()=>DriverAssignment)
export class DriverAssignmentsResolver {
    constructor(
        private readonly driverAssignmentsService:DriverAssignmentsService,
        private readonly prisma:PrismaService,
    ){}

    @AllowAuthenticated()
    @Mutation(()=>DriverAssignment)
    createDriverAssignment(
        @Args('createDriverAssignmentInput') args:CreateDriverAssignmentInput,
        @GetUser() user:GetUserType,
    ){
        checkRowLevelPermission(user, [args.pickupDriverId])
        return this.driverAssignmentsService.create(args)
    }

    @Query(()=>DriverAssignment,{name:'driverAssignment'})
    findOne(@Args() args:FindUniqueDriverAssignmentArgs){
        return this.driverAssignmentsService.findOne(args)
    }

    @AllowAuthenticated()
    @Mutation(()=>DriverAssignment)
    async updateDriverAssignment(
        @Args('updateValetAssignmentInput') args:UpdateDriverAssignmentInput,
        @GetUser() user: GetUserType,
    ){
        const driverAssignment = await this.prisma.driverAssignment.findUnique({
            where: {bookingId:args.bookingId},
        })
        checkRowLevelPermission(user,[
            driverAssignment.pickupDriverId,
        ])
        return this.driverAssignmentsService.update(args)
    }

    @AllowAuthenticated()
    @Mutation(()=>DriverAssignment)
    async removeDriverAssignment(
        @Args() args:FindUniqueDriverAssignmentArgs,
        @GetUser() user: GetUserType,
    ){
        const driverAssignment = await this.prisma.driverAssignment.findUnique(args)
        checkRowLevelPermission(user,[
            driverAssignment.pickupDriverId,
        ])
        return this.driverAssignmentsService.remove(args)
    }

    @ResolveField(()=>Driver, {nullable:true})
    pickupDriver(@Parent() parent:DriverAssignment){
        if(!parent.pickupDriverId){
            return null
        }
        return this.prisma.driver.findUnique({
            where:{uid:parent.pickupDriverId},
        })
    }

}
