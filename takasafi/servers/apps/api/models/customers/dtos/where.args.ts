import { Field,InputType,PartialType } from "@nestjs/graphql";
import { Prisma } from "@prisma/client";
import { DateTimeFilter,RestrictProperties,StringFilter } from "../../../common/dtos/common.input";
import { BookingListRelationFilter } from "../../bookings/dto/where.args"; 
import {ReviewListRelationFilter} from "../../reviews/dto/where.args"
import { UserRelationFilter } from "models/users/dtos/where.args";

@InputType()
export class CustomerWhereUniqueInput{
    uid:string
}

@InputType()
export class CustomerWhereInputStrict implements RestrictProperties<CustomerWhereInputStrict,Prisma.CustomerWhereInput>{
    User:UserRelationFilter
    uid:StringFilter
    createdAt:DateTimeFilter
    updatedAt:DateTimeFilter
    displayName:StringFilter
    Bookings:BookingListRelationFilter
    Reviews:ReviewListRelationFilter

    AND:CustomerWhereInput[]
    OR:CustomerWhereInput[]
    NOT:CustomerWhereInput[]
}

@InputType()
export class CustomerWhereInput extends PartialType(CustomerWhereInputStrict){}

@InputType()
export class CustomerListRelationFilter{
    every?:CustomerWhereInput
    some?:CustomerWhereInput
    none?:CustomerWhereInput
}

@InputType()
export class CustomerRelationFilter{
    is?:CustomerWhereInput
    isNot?:CustomerWhereInput
}