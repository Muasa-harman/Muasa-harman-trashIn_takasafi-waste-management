import { InputType,PartialType } from "@nestjs/graphql";
import { Prisma } from "@prisma/client";
import { DateTimeFilter,RestrictProperties,StringFilter,IntFilter } from "../../../common/dtos/common.input";
import { BookingTimelineListRelationFilter } from "models/booking-timelines/dto/where.args";
import { CompanyRelationFilter } from "models/companies/dto/where.args";
import { UserRelationFilter } from "models/users/dtos/where.args";
import { DriverAssignmentListRelationFilter } from "models/driver-assignments/dto/where.args";

@InputType()
export class DriverWhereUniqueInput{
    uid:string
}

@InputType()
export class DriverWhereInputStrict implements RestrictProperties<DriverWhereInputStrict,Prisma.DriverWhereInput>{
    User:UserRelationFilter
    uid:StringFilter
    createdAt:DateTimeFilter
    updateAt:DateTimeFilter
    displayName:StringFilter
    image:StringFilter
    licenceId:StringFilter
    companyId:IntFilter
    Company:CompanyRelationFilter
    BookingTimeline:BookingTimelineListRelationFilter
    PickupAssignment:DriverAssignmentListRelationFilter

    AND:DriverWhereInput[]
    OR:DriverWhereInput[]
    NOT:DriverWhereInput[]
}

@InputType()
export class DriverWhereInput extends PartialType(DriverWhereInputStrict){}

@InputType()
export class DriverListRelationFilter{
    every?:DriverWhereInput
    some?:DriverWhereInput
    none?:DriverWhereInput
}