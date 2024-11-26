import { Field,InputType,PartialType } from "@nestjs/graphql";
import { Prisma } from "@prisma/client";
import { RestrictProperties } from "common/dtos/common.input";
import {CustomerOrderByWithRelationInput} from "../../customers/dtos/order-by.args"
import { TruckOrderByWithRelationInput } from "models/trucks/dto/order-by.args";

@InputType()
export class ReviewOrderByWithRelationInputStrict implements RestrictProperties<ReviewOrderByWithRelationInputStrict,Prisma.ReviewsOrderByWithRelationInput>{
    @Field(()=>Prisma.SortOrder)
    id:Prisma.SortOrder
    @Field(()=>Prisma.SortOrder)
    createdAt:Prisma.SortOrder
    @Field(()=>Prisma.SortOrder)
    updatedAt:Prisma.SortOrder
    @Field(()=>Prisma.SortOrder)
    rating:Prisma.SortOrder
    @Field(()=>Prisma.SortOrder)
    comment:Prisma.SortOrder
    @Field(()=>Prisma.SortOrder)
    customerId:Prisma.SortOrder
    @Field(()=>Prisma.SortOrder)
    truckId:Prisma.SortOrder
    Customer:CustomerOrderByWithRelationInput
    Truck:TruckOrderByWithRelationInput
}

@InputType()
export class ReviewOrderByWithRelationInput extends PartialType(
    ReviewOrderByWithRelationInputStrict,
){}

@InputType()
export class ReviewOrderByRelationAggregateInput{
    @Field(()=>Prisma.SortOrder)
    _count?:Prisma.SortOrder
}