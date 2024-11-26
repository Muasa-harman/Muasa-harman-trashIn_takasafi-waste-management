import { InputType,PartialType } from "@nestjs/graphql";
import { Prisma } from "@prisma/client";
import { DateTimeFilter,FloatFilter,IntFilter,RestrictProperties,StringFilter } from "../../../common/dtos/common.input";
import { BookingRelationFilter } from "../../bookings/dto/where.args"; 
// import {DriverRelationFilter}

@InputType()
export class DriverAssignmentWhereUniqueInput{
    bookingId:number
}

@InputType()
export class DriverAssignmentWhereInputStrict implements RestrictProperties<DriverAssignmentWhereUniqueInput,Prisma.DriverAssignmentWhereInput>{
    bookingId:IntFilter
    createdAt:DateTimeFilter
    updatedAt:DateTimeFilter
    pickupLat:FloatFilter
    pickupLng:FloatFilter
    pickupDriverId:StringFilter
    Booking:BookingRelationFilter

    AND:DriverAssignmentWhereInput[]
    OR:DriverAssignmentWhereInput[]
    NOT:DriverAssignmentWhereInput[]
}

@InputType()
export class DriverAssignmentWhereInput extends PartialType(
    DriverAssignmentWhereInputStrict,
){}

@InputType()
export class DriverAssignmentListRelationFilter{
    every?:DriverAssignmentWhereInput
    some?:DriverAssignmentWhereInput
    none?:DriverAssignmentWhereInput
}

@InputType()
export class DriverAssignmentRelationFilter{
    is?:DriverAssignmentWhereInput
    isNot?:DriverAssignmentWhereInput
}