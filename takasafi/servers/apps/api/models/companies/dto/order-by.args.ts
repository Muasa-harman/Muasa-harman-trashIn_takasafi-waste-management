import { Field,InputType,PartialType } from "@nestjs/graphql";
import { Prisma } from "@prisma/client";
import { RestrictProperties } from "common/dtos/common.input";


@InputType()
export class CompanyOrderByWithRelationInputStrict implements RestrictProperties<CompanyOrderByWithRelationInputStrict,
Prisma.CompanyOrderByWithRelationInput
>{
    @Field(()=>Prisma.SortOrder)
    id: Prisma.SortOrder
    @Field(()=>Prisma.SortOrder)
    createdAt:Prisma.SortOrder
    @Field(()=>Prisma.SortOrder)
    updatedAt:Prisma.SortOrder
    @Field(()=>Prisma.SortOrder)
    displayName:Prisma.SortOrder
    @Field(()=>Prisma.SortOrder)
    description:Prisma.SortOrder
    Trucks:TruckOrderByRelationAggregateInput
    Managers:ManagerOrderByRelationAggregateInput
    Drivers:DriverOrderByRelationAggregateInput
}

@InputType()
export class CompanyOrderByRelationAggregateInput{
    @Field(()=>Prisma.SortOrder)
    _count?:Prisma.SortOrder
}