import { ArgsType,Field,registerEnumType,PartialType } from "@nestjs/graphql";
import { Prisma } from "@prisma/client";
import { RestrictProperties } from "../../../common/dtos/common.input";
import {}

registerEnumType(Prisma.UserScalarFieldEnum,{
    name: 'UserScalarFieldEnum',
})

@ArgsType()
class FindManyUserArgsStrict implements RestrictProperties<FindManyUserArgsStrict,Omit<Prisma.UserFindManyArgs,'include' | 'select'>>{
    where: UserWhereInput
    orderBy: UserOrderByWithRelationInput[]
    cursor: UserWhereUniqueInput
    take: number
    skip: number
    @Field(()=>[Prisma.])
}