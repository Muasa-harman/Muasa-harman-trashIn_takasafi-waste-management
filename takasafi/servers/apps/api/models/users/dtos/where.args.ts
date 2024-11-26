import { Field,InputType,PartialType } from "@nestjs/graphql";
import { Prisma } from "@prisma/client";
import { DateTimeFilter,RestrictProperties,StringFilter } from "common/dtos/common.input";
// import {DriverRelationFilter}
import { ManagerRelationFilter } from "models/managers/dto/where.args";
// import {Customer}

@InputType()
export class UserWhereUniqueInput{
    uid:string
}

@InputType()
export class UserWhereInputStrict implements RestrictProperties<
UserWhereInputStrict,Omit<Prisma.UserWhereInput, 'Credentials' | 'AuthProvider' | 'Admin' | 'image'>>{
    Customer:CustomerRelationFilter
    Manager:ManagerRelationFilter
    Driver:DriverRelationFilter
    uid:StringFilter
    createdAt:DateTimeFilter
    updatedAt:DateTimeFilter
    name:StringFilter

    AND:UserWhereInput
    OR:UserWhereInput
    NOT:UserWhereInput
}

@InputType()
export class UserWhereInput extends PartialType(UserWhereInputStrict){}

@InputType()
export class UserListRelationFilter{
    every?:UserWhereInput
    some?:UserWhereInput
    none?:UserWhereInput
}

@InputType()
export class UserRelationFilter{
    is?:UserWhereInput
    isNot?:UserWhereInput
}