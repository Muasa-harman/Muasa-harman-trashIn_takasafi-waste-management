import { Field,ObjectType } from "@nestjs/graphql";
import {Addresss as AddresssType} from "@prisma/client"
import { RestrictProperties } from "common/dtos/common.input";

@ObjectType()
export class Addresss implements RestrictProperties<Addresss, AddresssType>{
    id: number
    createdAt:Date
    updatedAt:Date
    address:string
    lat:number
    lng:number
    @Field({nullable: true})
    truckId:number
}