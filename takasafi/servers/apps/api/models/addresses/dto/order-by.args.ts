import { Field,InputType,PartialType } from "@nestjs/graphql";
import { Prisma } from "@prisma/client";
import { RestrictProperties } from "common/dtos/common.input";
import {TruckOrderByWithRelationInput} from '../../trucks/dto/order-by.args'

@InputType()
export class AddressOrderByWithRelationInputStrict implements RestrictProperties<AddressOrderByWithRelationInputStrict,
Prisma.AddressOrderByWithRelationInput>{
    @Field(()=>Prisma.SortOrder)
    id:Prisma.SortOrder
    createdAt:Prisma.SortOrder
    @Field(()=>Prisma.SortOrder)
    updatedAt:Prisma.SortOrder
    @Field(()=>Prisma.SortOrder)
    address:Prisma.SortOrder
    @Field(()=>Prisma.SortOrder)
    lat:Prisma.SortOrder
    @Field(()=>Prisma.SortOrder)
    lgn:Prisma.SortOrder
    @Field(()=>Prisma.SortOrder)
    truckId:Prisma.SortOrder
    Truck:Prisma.SortOrder
}

@InputType()
export class AddressOrderByWithRelationInput extends PartialType(
    AddressOrderByWithRelationInputStrict,
){}

@InputType()
export class AddressOrderByRelationAggregateInput{
    @Field(()=>Prisma.SortOrder)
    _count?:Prisma.SortOrder
}