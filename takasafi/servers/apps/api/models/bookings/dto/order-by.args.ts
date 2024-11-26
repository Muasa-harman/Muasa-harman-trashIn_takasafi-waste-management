import { Field,InputType,PartialType } from "@nestjs/graphql";
import { Prisma, PrismaPromise } from "@prisma/client";
import { RestrictProperties } from "common/dtos/common.input";
import { TruckOrderByRelationAggregateInput } from "models/trucks/dto/order-by.args";
import { BookingTimelineOrderByRelationAggregateInput } from "models/booking-timelines/dto/order-by.args";
import { CustomerOrderByWithRelationInput } from "models/customers/dtos/order-by.args";
import { DriverAssignmentOrderByWithRelationInput } from "models/driver-assignments/dto/order-by.args";

@InputType()
export class BookingOrderByWithRelationInputStrict implements RestrictProperties<BookingOrderByWithRelationInputStrict,Prisma.BookingOrderByWithRelationInput>{
    @Field(()=>Prisma.SortOrder)
    id:Prisma.SortOrder
    @Field(()=>Prisma.SortOrder)
    createdAt:Prisma.SortOrder
    @Field(()=>Prisma.SortOrder)
    updatedAt:Prisma.SortOrder
    @Field(()=>Prisma.SortOrder)
    normanPrice:Prisma.SortOrder
    @Field(()=>Prisma.SortOrder)
    specialPrice:Prisma.SortOrder
    @Field(()=>Prisma.SortOrder)
    collectionDay:Prisma.SortOrder
    @Field(()=>Prisma.SortOrder)
    vehicleNumber:Prisma.SortOrder
    @Field(()=>Prisma.SortOrder)
    phoneNumber:Prisma.SortOrder
    @Field(()=>Prisma.SortOrder)
    passcode:Prisma.SortOrder
    @Field(()=>Prisma.SortOrder)
    status:Prisma.SortOrder
    @Field(()=>Prisma.SortOrder)
    customerId:Prisma.SortOrder
    DriverAssignment:DriverAssignmentOrderByWithRelationInput
    BookingTimeline:BookingTimelineOrderByRelationAggregateInput
}

@InputType()
export class BookingOrderByWithRelationInput extends PartialType(
    BookingOrderByWithRelationInputStrict,
){}

@InputType()
export class BookingOrderByRelationAggregateInput{
    @Field(()=>Prisma.SortOrder)
    _count?:Prisma.SortOrder
}