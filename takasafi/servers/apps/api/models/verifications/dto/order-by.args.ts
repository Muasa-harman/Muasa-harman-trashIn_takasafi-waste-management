import { Field,InputType,PartialType } from "@nestjs/graphql";
import { Prisma } from "@prisma/client";
import { RestrictProperties } from "common/dtos/common.input";
import { TruckOrderByWithRelationInput } from "models/trucks/dto/order-by.args"; 
// import {AdminOrderByWithRelationInput} 

@InputType()
export class VerificationOrderByWithRelationInputStrict implements RestrictProperties<VerificationOrderByWithRelationInputStrict,Prisma.VerificationOrderByWithRelationInput>{
    @Field(()=>Prisma.SortOrder)
    createdAt:Prisma.SortOrder
    @Field(()=>Prisma.SortOrder)
    updatedAt:Prisma.SortOrder
    @Field(()=>Prisma.SortOrder)
    verified:Prisma.SortOrder
    @Field(()=>Prisma.SortOrder)
    adminId:Prisma.SortOrder
    Admin:AdminOrderByWithRelationInput
    Truck:TruckOrderByWithRelationInput
}

@InputType()
export class VerificationOrderByWithRelationInput extends PartialType(
    VerificationOrderByWithRelationInputStrict,
){}

@InputType()
export class VerificationOrderByRelationAggregateInput{
    @Field(()=>Prisma.SortOrder)
    _count?:Prisma.SortOrder
}