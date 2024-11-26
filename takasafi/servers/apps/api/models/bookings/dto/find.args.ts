import { ArgsType,Field,registerEnumType,PartialType } from "@nestjs/graphql";
import { Prisma } from "@prisma/client";
import { RestrictProperties } from "common/dtos/common.input";
import { BookingWhereInput, BookingWhereUniqueInput } from "./where.args";
import { BookingOrderByWithRelationInput } from "./order-by.args";

registerEnumType(Prisma.BookingScalarFieldEnum,{
    name:'CompanyScalarFieldEnum',
})

@ArgsType()
class FindManyBookingArgsStrict implements RestrictProperties<FindManyBookingArgsStrict,Omit<Prisma.BookingFindManyArgs, 'include' | 'select'>>{
    where:BookingWhereInput
    orderBy:BookingOrderByWithRelationInput[]
    cursor:BookingWhereUniqueInput
    take:number
    skip:number
    @Field(()=>[Prisma.BookingScalarFieldEnum])
    distinct:Prisma.BookingScalarFieldEnum[]
}

@ArgsType()
export class FindManyBookingArgs extends PartialType(
    FindManyBookingArgsStrict,
){}

@ArgsType()
export class FindUniqueBookingArgs{
    where:BookingWhereUniqueInput
}