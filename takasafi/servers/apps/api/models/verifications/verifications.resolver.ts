import { Resolver,Query,Mutation,Args } from '@nestjs/graphql';
import { VerificationsService } from './verifications.service';
import { Verification } from './entity/verification.entity';
import { FindManyVerificationArgs,FindUniqueVerificationArgs } from './dto/find.args';
import { CreateVerificationInput } from './dto/create-verification.input';
import { UpdateVerificationInput } from './dto/update-verification.input';
import { AllowAuthenticated,GetUser } from 'common/auth/auth.decorator';
import { PrismaService } from 'common/prisma/prisma.service';
import { GetUserType } from 'common/types';

@Resolver(()=>Verification)
export class VerificationsResolver {
    constructor(private readonly verificationService:VerificationsService,
        private readonly prisma: PrismaService,
    ){}

    @AllowAuthenticated('admin')
    @Mutation(()=>Verification)
    createVerification(
        @Args('createVerificationInput') args:CreateVerificationInput,
        @GetUser() user:GetUserType,
    ){
        return this.verificationService.create(args,user.uid)
    }

    @Query(()=>Verification,{name:'verification'})
    findOne(@Args() args:FindUniqueVerificationArgs){
        return this.verificationService.findOne(args)
    }

    @AllowAuthenticated('admin')
    @Mutation(()=>Verification)
    async updateVerification(
        @Args('updateVerificationUpdate') args:UpdateVerificationInput,
    ){
        return this.verificationService.update(args)
    }

    @AllowAuthenticated('admin')
    @Mutation(()=>Verification)
    async removeVerification(@Args() args: FindUniqueVerificationArgs){
        return this.verificationService.remove(args)
    }
}
