import { Field,InputType,PartialType } from "@nestjs/graphql";
import { Prisma } from "@prisma/client";
import { RestrictProperties } from "common/dtos/common.input";
import { AddressOrderByWithRelationInput } from "models/addresses/dto/order-by.args";
import { CompanyOrderByWithRelationInput } from "models/companies/dto/order-by.args";

@InputType()
export class TruckOrderByWithRelationInputStrict implements RestrictProperties<TruckOrderByWithRelationInputStrict,Prisma.TruckOrderByWithRelationInput>{
    @Field(()=>Prisma.SortOrder)
    id:Prisma.SortOrder
    @Field(()=>Prisma.SortOrder)
    createdAt:Prisma.SortOrder
    @Field(()=>Prisma.SortOrder)
    updatedAt:Prisma.SortOrder
    @Field(()=>Prisma.SortOrder)
    displayName:Prisma.SortOrder
    @Field(()=>Prisma.SortOrder)
    description:Prisma.SortOrder
    @Field(()=>Prisma.SortOrder)
    images:Prisma.SortOrder
    @Field(()=>Prisma.SortOrder)
    companyId:Prisma.SortOrder
    Company:CompanyOrderByWithRelationInput
    Address:AddressOrderByWithRelationInput
    // verification:
    // Reviews:

}

@InputType()
export class TruckOrderByWithRelationInput extends PartialType(
    TruckOrderByWithRelationInputStrict,
){}

@InputType()
export class TruckOrderByRelationAggregateInput{
    @Field(()=>Prisma.SortOrder)
    _count?:Prisma.SortOrder
}