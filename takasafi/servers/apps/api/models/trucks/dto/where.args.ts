import { InputType,PartialType } from "@nestjs/graphql";
import { Truck} from "@prisma/client"
import { DateTimeFilter,IntFilter,RestrictProperties,StringFilter,StringListFilter } from "common/dtos/common.input";
// import {AddressRelationFilter}
import { CompanyRelationFilter } from "models/companies/dto/where.args";
// import {ReviewList}

@InputType()
export class TruckWhereUniqueInput{
    id:number
}

@InputType()
export class TruckWhereInputStrict implements RestrictProperties<TruckWhereInputStrict,Prisma.TruckWhereInput>{
    id:IntFilter
    createdAt:DateTimeFilter
    updatedAt:DateTimeFilter
    displayName:StringFilter
    description:StringFilter
    images:StringFilter
    companyId:IntFilter
    Company:CompanyRelationFilter
    Address:AddressRelationFilter
    Verification:VerificationRelationFilter
    Reviews:ReviewListRelationFilter

    AND:TruckWhereInput[]
    OR:TruckWhereInput[]
    NOT:TruckWhereInput[]

}

@InputType()
export class TruckWhereInput extends PartialType(TruckWhereInputStrict){}

@InputType()
export class TrucksListRelationFilter{
    every?:TruckWhereInput
    some?:TruckWhereInput
    none: TruckWhereInput
}