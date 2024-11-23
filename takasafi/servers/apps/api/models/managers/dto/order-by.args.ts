import { Field,InputType,PartialType } from "@nestjs/graphql";
import { Prisma } from "@prisma/client";
import { RestrictProperties } from "../../../common/dtos/common.input";
import {UserOrderByWithRelationInput}

@InputType()
export class ManagerOrderByWithRelationInputStrict implements
 RestrictProperties<ManagerOrderByWithRelationInputStrict,
 Prisma.ManagerOrderByWithRelationInput>
 {
     User:UserOrderByWithRelationInput
     @Field(()=>Prisma.SortOrder)
}