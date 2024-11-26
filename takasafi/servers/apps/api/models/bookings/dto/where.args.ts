import { Field,InputType,PartialType } from "@nestjs/graphql";
import { $Enums,BookingStatus,Prisma } from "@prisma/client";
import { DateTimeFilter,FloatFilter,IntFilter,RestrictProperties,StringFilter } from "../../../common/dtos/common.input";
import { BookingTimelineRelationFilter } from "models/booking-timelines/dto/where.args";


@InputType()
export class BookingWhereInputStrict implements RestrictProperties<BookingWhereInputStrict,Prisma.BookingWhereInput>{
    id: IntFilter
    createdAt:DateTimeFilter
    updatedAt:DateTimeFilter
    normalPrice:FloatFilter
    vehicleNumber:StringFilter
    passcode:StringFilter

    status:EnumBookingStatusFilter
    customerId:StringFilter
    driverAssignment:DriverAssignmentRelationFilter
    BookingTimeline:BookingTimelineListRelationFilter

    AND:BookingWhereInput[]
    OR:BookingWhereInput[]
    NOT:BookingWhereInput[]
}

@InputType()
export class BookingWhereInput extends PartialType(BookingWhereInputStrict){}

@InputType()
export class BookingListRelationFilter{
    every?:BookingWhereInput
    some?:BookingWhereInput
    none?:BookingWhereInput
}

@InputType()
export class BookingRelationFilter{
    is?:BookingWhereInput
    isNot?:BookingWhereInput
}

// @InputType()
// export class EnumBookingStatusFilter{
//     @Field(()=>BookingStatus, {nullable:true})
//     equals: BookingStatus;
//     @Field(()=>[BookingStatus], {nullable: true})
//     in:BookingStatus[]
//     @Field(()=>[BookingStatus], {nullable:true})
//     notIn: BookingStatus
// }

// @InputType()
// export class BookingWhereInputStrict implements RestrictProperties<BookingWhereInputStrict,Prisma.BookingWhereInput>{
//     id: IntFilter
//     createdAt: DateTimeFilter
//     updateAt:DateTimeFilter
//     specialPrice:FloatFilter
//     normalPrice:FloatFilter
//     vehicleNumber:StringFilter
//     phoneNumber:StringFilter
//     passcode:StringFilter

//     status: EnumBookingStatusFilter
//     customerId: StringFilter
//     DriverAssignment:DriverAssignmentRelationFilter
//     Customer: CustomerRelationFilter
//     BookingTimeLine: BookingTimelineListRelationFilter

//     AND:BookingWhereInput[]
//     OR:BookingWhereInput[]
//     NOT:BookingWhereInput[]
// }

// @InputType()
// export class BookingWhereInput extends PartialType(BookingWhereInputStrict){}

// @InputType()
// export class BookingListRelationFilter{
//     is?:BookingWhereInput
//     isNot?:BookingWhereInput
// }