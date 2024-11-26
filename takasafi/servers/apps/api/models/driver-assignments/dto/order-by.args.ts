import { Field,InputType,PartialType } from "@nestjs/graphql";
import { Prisma } from "@prisma/client";
import { RestrictProperties } from "common/dtos/common.input";
import { BookingTimelineOrderByWithRelationInput } from "models/booking-timelines/dto/order-by.args";
import { DriverOrderByWithRelationInput } from "models/driver/dto/order-by.args";
// import {BookingOrderByWithRelationInput}

@InputType()
export class DriverAssignmentOrderByWithRelationInputStrict implements RestrictProperties<DriverAssignmentOrderByWithRelationInputStrict,Prisma.DriverAssignmentOrderByWithRelationInput>{
    @Field(()=>Prisma.SortOrder)
    bookingId:Prisma.SortOrder
    @Field(()=>Prisma.SortOrder)
    createdAt:Prisma.SortOrder
    @Field(()=>Prisma.SortOrder)
    updatedAt:Prisma.SortOrder
    @Field(()=>Prisma.SortOrder)
    pickupLat:Prisma.SortOrder
    @Field(()=>Prisma.SortOrder)
    pickupLng:Prisma.SortOrder
    @Field(()=>Prisma.SortOrder)
    pickupDriverId:Prisma.SortOrder
    PickupDriver:DriverOrderByWithRelationInput
    Booking:BookingTimelineOrderByWithRelationInput
}

@InputType()
export class DriverAssignmentOrderByWithRelationInput extends PartialType(
    DriverAssignmentOrderByWithRelationInputStrict,
){}

@InputType()
export class DriverAssignmentOrderByRelationAggregateInput{
    @Field(()=>Prisma.SortOrder)
    _count?:Prisma.SortOrder
}