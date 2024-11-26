import { ArgsType,Field,registerEnumType,PartialType } from "@nestjs/graphql";
import { Prisma } from "@prisma/client";
import {ReviewOrderByWithRelationInput} from "./order-by.args"
import {ReviewWhereInput,ReviewWhereUniqueInput} from "./where.args"
import { RestrictProperties } from "common/dtos/common.input";

registerEnumType(Prisma.ReviewsScalarFieldEnum,{
    name:'ReviewScalarFieldEnum',
})

@ArgsType()
class FindManyReviewArgsStrict implements RestrictProperties<FindManyReviewArgsStrict,Omit<Prisma.ReviewsFindManyArgs, 'include' | 'select'>>{
    where:ReviewWhereInput
    orderBy:ReviewOrderByWithRelationInput[]
    cursor:ReviewWhereUniqueInput
    take:number
    skip:number
    @Field(()=>[Prisma.ReviewsScalarFieldEnum])
    distinct:Prisma.ReviewsScalarFieldEnum
}

@ArgsType()
export class FindManyReviewArgs extends PartialType(FindManyReviewArgsStrict){}

@ArgsType()
export class FindUniqueReviewArgs{
    where:ReviewWhereUniqueInput
}