import { Field,InputType,PartialType } from "@nestjs/graphql";
import { Prisma } from "@prisma/client";
import { DateTimeFilter,IntFilter,RestrictProperties,StringFilter } from "common/dtos/common.input";

@InputType()
export class ManagerWhereUniqueInput{
    uid: string
}

@InputType()
export class ManagerWhereUniqueInputStrict implements RestrictProperties<ManagerWhereUniqueInputStrict, Prisma.ManagerWhereInput>{
    User: User: UserRelationFilter
    uid: StringFilter
    createdAt: DateTimeFilter
    displayName: StringFilter
    companyId: IntFilter
    Company: CompanyRelationFilter
    BookingTimeline: BookingTimelineListRElationFilter

    AND:ManagerWhereInput[]
    OR:ManagerWhereInput[]
    NOT: ManagerWhereInput[]
}

@InputType()
export class ManagerWhereInput extends PartialType(ManagerWhereInputStrict){}

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