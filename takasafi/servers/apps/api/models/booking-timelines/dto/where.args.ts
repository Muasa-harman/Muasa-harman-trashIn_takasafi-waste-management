import { Field,InputType,PartialType, PickType } from "@nestjs/graphql";
import { $Enums,Prisma } from "@prisma/client";
import { DateTimeFilter,IntFilter,RestrictProperties,StringFilter } from "../../../common/dtos/common.input";
import { BookingRelationFilter } from "models/bookings/dto/where.args";
import { ManagerRelationFilter } from "models/managers/dto/where.args";

@InputType()
export class BookingTimelineWhereUniqueInput {
    id: number
}

@InputType()
export class BookingTimelineWhereInputStrict implements RestrictProperties<BookingTimelineWhereInputStrict,Prisma.BookingTimelineWhereInput>{
    id:IntFilter
    timestamp:DateTimeFilter
    @Field(()=>$Enums.BookingStatus)
    status:$Enums.BookingStatus
    bookingId:IntFilter
    driverId:StringFilter
    managerId:StringFilter
    Booking:BookingRelationFilter
    Driver:DriverRelationFilter
    Manager:ManagerRelationFilter

    AND:BookingTimelineWhereInput[]
    OR:BookingTimelineWhereInput[]
    NOT:BookingTimelineWhereInput[]
}

@InputType()
export class BookingTimelineWhereInput extends PartialType(
    BookingTimelineWhereInputStrict,
){}

@InputType()
export class BookingTimelineListRelationFilter {
    every?:BookingTimelineWhereInput
    some?:BookingTimelineWhereInput
    none?:BookingTimelineWhereInput
}

@InputType()
export class BookingTimelineRelationFilter{
    is?:BookingTimelineWhereInput
    isNot?:BookingTimelineWhereInput
}

