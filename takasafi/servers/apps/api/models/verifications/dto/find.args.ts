import { ArgsType,Field,registerEnumType,PartialType } from "@nestjs/graphql";
import { Prisma } from "@prisma/client";
import { VerificationOrderByWithRelationInput } from "./order-by.args";
import { VerificationWhereInput,VerificationWhereUniqueInput } from "./where.args";
import { RestrictProperties } from "common/dtos/common.input";

registerEnumType(Prisma.VerificationScalarFieldEnum,{
    name:'VerificationScalarFieldEnum',
})

@ArgsType()
class FindManyVerificarionArgsStrict implements RestrictProperties<FindManyVerificarionArgsStrict,Omit<Prisma.VerificationFindManyArgs, 'include' | 'select'>>{
    where:VerificationWhereInput
    orderBy:VerificationOrderByWithRelationInput[]
    cursor:VerificationWhereUniqueInput
    take:number
    skip:number
    @Field(()=>[Prisma.VerificationScalarFieldEnum])
    distinct:Prisma.VerificationScalarFieldEnum[]
}

@ArgsType()
export class FindManyVerificationArgs extends PartialType(
    FindManyVerificarionArgsStrict,
){}

@ArgsType()
export class FindUniqueVerificationArgs{
    where:VerificationWhereUniqueInput
}