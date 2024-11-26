import { Field,InputType,PartialType } from "@nestjs/graphql";
import { Prisma } from "@prisma/client";
import { RestrictProperties } from "common/dtos/common.input";
import { UserOrderByWithRelationInput } from "models/users/dtos/order-by.args";
import { VerificationOrderByRelationAggregateInput } from "models/verifications/dto/order-by.args";

@InputType()
export class AdminOrderByWithRelationInputStrict implements RestrictProperties<AdminOrderByWithRelationInputStrict,Prisma.AdminOrderByWithRelationInput>{
    Verifications:VerificationOrderByRelationAggregateInput
    @Field(()=>Prisma.SortOrder)
    uid:Prisma.SortOrder
    @Field(()=>Prisma.SortOrder)
    createdAt:Prisma.SortOrder
    @Field(()=>Prisma.SortOrder)
    updateAt:Prisma.SortOrder
    User:UserOrderByWithRelationInput
}

@InputType()
export class AdminOrderByWithRelationInput extends PartialType(
    AdminOrderByWithRelationInputStrict,
){}

@InputType()
export class AdminOrderByWithRelationAggregateInput{
    @Field(()=>Prisma.SortOrder)
    _count?:Prisma.SortOrder
}