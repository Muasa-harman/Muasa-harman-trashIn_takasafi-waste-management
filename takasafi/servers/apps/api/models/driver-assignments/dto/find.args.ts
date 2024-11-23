import { ArgsType,Field,registerEnumType,PartialType } from "@nestjs/graphql";
import { Prisma } from "@prisma/client";
import { RestrictProperties } from "../../../common/dtos/common.input";

registerEnumType(Prisma.DriverAssignmentScalarFieldEnum,{
    name:'DriverAssignmentScalarFieldEnum',
})

@ArgsType()
class FindManyDriverAssignmentArgsStrict
 implements RestrictProperties<FindManyDriverAssignmentArgsStrict,
 Omit<Prisma.DriverAssignmentFindManyArgs,'include' | 'select'>>{
    where:DriverAssignmentWhereInput
    orderBy:DriverAssignmentOrderByWithRelationInput[]
    cursor: DriverAssignmentWhereUniqueInput
    take:number
    skip:number
    @Field(()=>[Prisma.DriverAssignmentScalarFieldEnum])
    distinct: Prisma.DriverAssignmentScalarFieldEnum[]
 }