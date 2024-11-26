import { Field,InputType,PartialType } from "@nestjs/graphql";
import { Prisma } from "@prisma/client";
import { RestrictProperties } from "../../../common/dtos/common.input";
import { UserOrderByWithRelationInput } from "models/users/dtos/order-by.args";
import { CompanyOrderByWithRelationInput } from "models/companies/dto/order-by.args";
import { BookingTimelineOrderByRelationAggregateInput } from "models/booking-timelines/dto/order-by.args";

@InputType()
export class ManagerOrderByWithRelationInputStrict implements
 RestrictProperties<ManagerOrderByWithRelationInputStrict,
 Prisma.ManagerOrderByWithRelationInput>
 {
     User:UserOrderByWithRelationInput
     @Field(()=>Prisma.SortOrder)
     @Field(() => Prisma.SortOrder)
  uid: Prisma.SortOrder
  @Field(() => Prisma.SortOrder)
  createdAt: Prisma.SortOrder
  @Field(() => Prisma.SortOrder)
  updatedAt: Prisma.SortOrder
  @Field(() => Prisma.SortOrder)
  displayName: Prisma.SortOrder
  @Field(() => Prisma.SortOrder)
  companyId: Prisma.SortOrder

  Company: CompanyOrderByWithRelationInput
  BookingTimeline: BookingTimelineOrderByRelationAggregateInput
  // Todo: Add below field decorator to the SortOrder properties.
  // @Field(() => Prisma.SortOrder)
}

@InputType()
export class ManagerOrderByWithRelationInput extends PartialType(
  ManagerOrderByWithRelationInputStrict,
) {}

@InputType()
export class ManagerOrderByRelationAggregateInput {
  @Field(() => Prisma.SortOrder)
  _count?: Prisma.SortOrder
}
