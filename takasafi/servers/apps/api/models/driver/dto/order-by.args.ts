import { Field,InputType,PartialType } from "@nestjs/graphql";
import { Prisma } from "@prisma/client";
import { RestrictProperties } from "common/dtos/common.input";
import { CompanyOrderByWithRelationInput } from "models/companies/dto/order-by.args";
import { UserOrderByWithRelationInput } from "models/users/dtos/order-by.args";
import { DriverAssignmentOrderByRelationAggregateInput } from "models/driver-assignments/dto/order-by.args";
import { BookingTimelineOrderByRelationAggregateInput } from "models/booking-timelines/dto/order-by.args";

@InputType()
export class DriverOrderByWithRelationInputStrict implements RestrictProperties<DriverOrderByWithRelationInputStrict,Prisma.DriverOrderByWithRelationInput>{
    User:UserOrderByWithRelationInput
    @Field(()=>Prisma.SortOrder)
    uid:Prisma.SortOrder
    @Field(()=>Prisma.SortOrder)
    createdAt:Prisma.SortOrder
    @Field(()=>Prisma.SortOrder)
    displayName:Prisma.SortOrder
    @Field(()=>Prisma.SortOrder)
    image:Prisma.SortOrder
    @Field(()=>Prisma.SortOrder)
    licenceID:Prisma.SortOrder
    @Field(()=>Prisma.SortOrder)
    companyId:Prisma.SortOrder
    Company:CompanyOrderByWithRelationInput
    BookingTimeline:BookingTimelineOrderByRelationAggregateInput
    PickupAssignments:DriverAssignmentOrderByRelationAggregateInput

}


InputType()
export class DriverOrderByWithRelationInput extends PartialType(
    DriverOrderByWithRelationInputStrict,
){}

@InputType()
export class DriverOrderByRelationAggregateInput{
    @Field(()=>Prisma.SortOrder)
    _count?:Prisma.SortOrder
}