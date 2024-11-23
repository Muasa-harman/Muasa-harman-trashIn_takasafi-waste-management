import { InputType,PartialType } from "@nestjs/graphql";
import { Prisma } from "@prisma/client";
import { BoolFilter,DateTimeFilter,IntFilter,RestrictProperties,StringFilter } from "common/dtos/common.input";
import { TrucksListRelationFilter } from "models/trucks/dto/where.args";

@InputType()
export class VerificationWhereUniqueInput{
    truckId:number
}

@InputType()
export class VerificationWhereInputStrict implements RestrictProperties<VerificationWhereInputStrict,Prisma.VerificationWhereInput>{
    createdAt:DateTimeFilter
    updatedAt:DateTimeFilter
    verified:BoolFilter
    adminId:StringFilter
    truckId:IntFilter
    Admin:AdminRelationFilter
    Truck:TruckRelationFilter 

    AND:VerificationWhereInput[]
    OR:VerificationWhereInput[]
    NOT:VerificationWhereInput[]
}

@InputType()
export class VerificationWhereInput extends PartialType(
    VerificationWhereInputStrict,
){}

@InputType()
export class VerificationListRelationFilter{
    every?:VerificationWhereInput
    some?:VerificationWhereInput
    none?:VerificationWhereInput
}

@InputType()
export class VerificationRelationFilter{
    is?:VerificationWhereInput
    isNot?:VerificationWhereInput
}