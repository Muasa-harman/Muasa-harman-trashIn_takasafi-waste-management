import { Field,InputType,PartialType } from "@nestjs/graphql";
import { Prisma } from "@prisma/client";
import { RestrictProperties } from "common/dtos/common.input";
import {BookingOrderByRelationAggregateInput} from "../../bookings/dto/order-by.args";
import { ReviewOrderByRelationAggregateInput } from "models/reviews/dto/order-by.args";
import { UserOrderByWithRelationInput } from "models/users/dtos/order-by.args";

@InputType()
export class CustomerOrderByWithRelationInputStrict implements RestrictProperties<CustomerOrderByWithRelationInputStrict,Prisma.CustomerOrderByWithRelationInput>{
    User:UserOrderByWithRelationInput
    @Field(()=>Prisma.SortOrder)
    uid:Prisma.SortOrder
    @Field(()=>Prisma.SortOrder)
    createdAt:Prisma.SortOrder
    @Field(()=>Prisma.SortOrder)
    updatedAt:Prisma.SortOrder
    @Field(()=>Prisma.SortOrder)
    displayName:Prisma.SortOrder

    Bookings:BookingOrderByRelationAggregateInput
    Reviews:ReviewOrderByRelationAggregateInput
}

@InputType()
export class CustomerOrderByWithRelationInput extends PartialType(
    CustomerOrderByWithRelationInputStrict,
){}

@InputType()
export class CustomerOrderByRelationAggregateInput{
    @Field(()=>Prisma.SortOrder)
    _count?:Prisma.SortOrder
}