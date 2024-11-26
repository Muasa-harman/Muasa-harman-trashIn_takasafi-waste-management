import { Field,InputType,PartialType } from "@nestjs/graphql";
import { Prisma } from "@prisma/client";
import { RestrictProperties } from "../../../common/dtos/common.input";
// import {BookingOrderByWithRelationInput} "../../bookings/dto/order-by.args"
// import {ManagerOrder}
// import {Dri}


@InputType()
export class BookingTimelineOrderByWithRelationInputStrict implements RestrictProperties<
BookingTimelineOrderByWithRelationInputStrict,Prisma.BookingTimelineOrderByWithRelationInput>{
    @Field(()=>Prisma.SortOrder)
    id:Prisma.SortOrder
    timestamp:Prisma.SortOrder
    @Field(()=>Prisma.SortOrder)
    status: Prisma.SortOrder
    @Field(()=>Prisma.SortOrder)
    bookingId:Prisma.SortOrder
    @Field(()=>Prisma.SortOrder)
    driverId:Prisma.SortOrder
    @Field(()=>Prisma.SortOrder)
    managerId:Prisma.SortOrder
    Booking:BookingOrderByWithRelationInput
    Driver:DriverOrderByWithRelationInput
    Manager:MnagerOrderByWithRelationInput
}

@InputType()
export class BookingTimelineOrderByWithRelationInput extends PartialType(
    BookingTimelineOrderByWithRelationInputStrict,
){}

@InputType()
export class BookingTimelineOrderByRelationAggregateInput{
    @Field(()=>Prisma.SortOrder)
    _count?:Prisma.SortOrder
}
