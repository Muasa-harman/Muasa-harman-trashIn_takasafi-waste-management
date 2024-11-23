import { InputType,PartialType } from "@nestjs/graphql";
import { Prisma } from "@prisma/client";
import { DateTimeFilter,FloatFilter,IntFilter,RestrictProperties,StringFilter } from "common/dtos/common.input";
import { TruckRelationFilter } from "models/trucks/dto/where.args";

@InputType()
export class AddressWhereUniqueInput{
    id:number
}

@InputType()
export class AddressWhereInputStrict implements RestrictProperties<AddressWhereInputStrict,Prisma.AddressWherenput>{
    id:IntFilter
    createdAt:DateTimeFilter
    updatedAt:DateTimeFilter
    address:StringFilter
    lat:FloatFilter
    lng:FloatFilter
    truckId:IntFilter
    Truck:TruckRelationFilter

    AND:AddressWhereInput[]
    OR:AddressWhereInput[]
    NOT:AddressWhereInput[]
}

@InputType()
export class AddressWhereInput extends PartialType(AddressWhereInputStrict){}

@InputType()
export class AddressRelationFilter{
    is?:AddressRelationFilter
    isNot?:AddressWhereInput
}