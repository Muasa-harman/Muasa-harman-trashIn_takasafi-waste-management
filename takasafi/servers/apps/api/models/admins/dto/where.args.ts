import { InputType,PartialType } from "@nestjs/graphql";
import { Prisma } from "@prisma/client";
import { DateTimeFilter,RestrictProperties,StringFilter } from "common/dtos/common.input";
import { UserRelationFilter } from "models/users/dtos/where.args";
import { VerificationListRelationFilter } from "models/verifications/dto/where.args";

@InputType()
export class AdminWhereUniqueInput{
    uid:string
}

@InputType()
export class AdminWhereInputStrict implements RestrictProperties<AdminWhereInputStrict,Prisma.AdminWhereInput>{
    verifications:VerificationListRelationFilter
    uid:StringFilter
    createdAt:DateTimeFilter
    updateFilter:DateTimeFilter
    User:UserRelationFilter

    AND:AdminWhereInput[]
    OR:AdminWhereInput[]
    NOT:AdminWhereInput[]
}
@InputType()
export class AdminWhereInput extends PartialType(AdminWhereInputStrict){}

@InputType()
export class AdminRelationFilter{
    is?:AdminWhereInput
    isNot?:AdminWhereInput
}