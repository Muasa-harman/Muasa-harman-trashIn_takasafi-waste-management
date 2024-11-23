import { InputType,PartialType } from "@nestjs/graphql";
import { Prisma } from "@prisma/client";
import { DateTimeFilter,IntFilter,RestrictProperties,StringFilter } from "common/dtos/common.input";


@InputType()
export class CompanyWhereUniqueInput{
    id: number
}

@InputType()
export class CompanyWhereUniqueInputStrict implements RestrictProperties<CompanyWhereInputStrict,Prisma.CompanyWhereInput>{
    id: IntFilter
    createdAt:DateTimeFilter
    updatedAt:DateTimeFilter
    displayName:StringFilter
    description:StringFilter
    Trucks:TrucksListRelationFilter
    Driver:DriverListRelationFilter

    AND:CompanyWhereInput[]
    OR:CompanyWhereInput[]
    NOT:CompanyWhereInput
}

@InputType()
export class CompanyWhereInput extends PartialType(CompanyWhereInputStrict){}

@InputType()
export class CompanyListRelationFilter{
    every?:CompanyWhereInput
    some?:CompanyWhereInput
    none?:CompanyWhereInput
}

@InputType()
export class CompanyRelationFilter{
    is?:CompanyWhereInput
    isNot?:CompanyWhereInput
}