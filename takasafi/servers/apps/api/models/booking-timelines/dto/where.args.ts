import { Field,InputType,PartialType, PickType } from "@nestjs/graphql";
import { $Enums,Prisma } from "@prisma/client";
import { DateTimeFilter,IntFilter,RestrictProperties,StringFilter } from "../../../common/dtos/common.input";
import { BookingListRelationFilter } from "models/bookings/dto/where.args";

@InputType()
export class CreateBookingTimelineInput extends PickType(
    BookingTimeline,
    ['bookingId','status'],
    InputType
){}