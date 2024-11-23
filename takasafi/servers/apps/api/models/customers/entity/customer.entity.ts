import { Field,ObjectType } from "@nestjs/graphql";
import {Customer as CustomerType} from '@prisma/client'
import { RestrictProperties } from "../../../common/dtos/common.input";

@ObjectType()
export class Customer implements RestrictProperties<Customer,CustomerType>{
    uid:string
    createdAt: Date
    updatedAt: Date
    @Field({nullable: true})
    displayName: string
}