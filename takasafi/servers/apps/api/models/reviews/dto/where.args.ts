import { InputType,PartialType } from "@nestjs/graphql";
import { Prisma } from "@prisma/client";
import { DateTimeFilter,IntFilter,RestrictProperties,StringFilter } from "../../../common/dtos/common.input";
import {CustomerRelationFilter} from "../../customers/dtos/where.args";
import { TruckRelationFilter } from "models/trucks/dto/where.args";


@InputType()
export class ReviewWhereUniqueInput{
    id:number
}

@InputType()
export class ReviewWhereInputStrict implements RestrictProperties<ReviewWhereInputStrict,Prisma.ReviewWhereInput>{
    id: IntFilter
    createdAt:DateTimeFilter
    updatedAt:DateTimeFilter
    rating:IntFilter
    comment:StringFilter
    customerId:StringFilter
    truckId:IntFilter
    Customer:CustomerRelationFilter
    Truck:TruckRelationFilter

    AND:ReviewWhereInput[]
    OR:ReviewWhereInput[]
    NOT:ReviewWhereInput[]
}

@InputType()
export class ReviewWhereInput extends PartialType(ReviewWhereInputStrict){}

@InputType()
export class ReviewListRelationFilter{
    every?:ReviewWhereInput
    some?:ReviewWhereInput
    none?:ReviewWhereInput
}

@InputType()
export class ReviewRelationFilter{
    is?:ReviewWhereInput
    isNot?:ReviewWhereInput
}