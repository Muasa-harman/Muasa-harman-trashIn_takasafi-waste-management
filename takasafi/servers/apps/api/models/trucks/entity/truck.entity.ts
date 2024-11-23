import { Field,ObjectType } from "@nestjs/graphql";
import {Truck as TruckType} from "@prisma/client"
import { RestrictProperties } from "common/dtos/common.input";

@ObjectType()
export class Truck implements RestrictProperties<Truck,TruckType>{
    id: number
    createdAt:Date
    updatedAt: Date
    @Field({nullable:true})
    displayName: string
    @Field({nullable: true})
    description:string
    images:string[]
    companyId:number
}

