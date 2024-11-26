import { Field,InputType,PartialType } from "@nestjs/graphql";
import { Prisma, User } from "@prisma/client";
import { DateTimeFilter,IntFilter,RestrictProperties,StringFilter } from "common/dtos/common.input";
import { BookingTimelineListRelationFilter } from "models/booking-timelines/dto/where.args";
import { CompanyRelationFilter } from "models/companies/dto/where.args";
import { UserRelationFilter } from "models/users/dtos/where.args";

@InputType()
export class ManagerWhereUniqueInput{
    uid: string
}

@InputType()
export class ManagerWhereUniqueInputStrict implements RestrictProperties<ManagerWhereUniqueInputStrict, Prisma.ManagerWhereInput>{
    User: UserRelationFilter
    uid: StringFilter
    createdAt: DateTimeFilter
    displayName: StringFilter
    companyId: IntFilter
    Company: CompanyRelationFilter
    BookingTimeline: BookingTimelineListRelationFilter

    AND:ManagerWhereInput[]
    OR:ManagerWhereInput[]
    NOT: ManagerWhereInput[]
}

@InputType()
export class ManagerWhereInput extends PartialType(ManagerWhereUniqueInputStrict){}

@InputType()
export class ManagerWhereListRelationFilter{
    every?:ManagerWhereInput
    some?:ManagerWhereInput
    none?:ManagerWhereInput
}

@InputType()
export class ManagerRelationFilter{
    is?:ManagerWhereInput
    isNot?:ManagerWhereInput
}