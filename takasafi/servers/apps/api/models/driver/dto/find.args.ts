import { ArgsType,Field,registerEnumType,PartialType } from "@nestjs/graphql";
import { Prisma } from "@prisma/client";
import { RestrictProperties } from "common/dtos/common.input";
import { DriverOrderByWithRelationInput } from "./order-by.args";
import { DriverWhereInput,DriverWhereUniqueInput } from "./where.args";

registerEnumType(Prisma.DriverScalarFieldEnum,{
    name:'ValetScalarFieldEnum',
})

@ArgsType()
class FindManyDriverArgsStrict implements RestrictProperties<
FindManyDriverArgsStrict,Omit<Prisma.DriverFindManyArgs,'include' | 'select'>
>{
    where:DriverWhereInput
    orderBy:DriverOrderByWithRelationInput[]
    cursor:DriverWhereUniqueInput
    take:number
    skip:number
    @Field(()=>[Prisma.DriverScalarFieldEnum])
    distinct:Prisma.DriverScalarFieldEnum[]
}

@ArgsType()
export class FindManyDriverArgs extends PartialType(FindManyDriverArgsStrict){}

@ArgsType()
export class FindUniqueDriverArgs{
    where:DriverWhereUniqueInput
}