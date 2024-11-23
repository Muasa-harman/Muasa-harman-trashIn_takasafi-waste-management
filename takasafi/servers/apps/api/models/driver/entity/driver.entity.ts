import { Field,ObjectType } from "@nestjs/graphql";
import {Driver as DriverType} from '@prisma/client'
import { RestrictProperties } from "../../../common/dtos/common.input";

@ObjectType()
export class Driver implements RestrictProperties<Driver, DriverType>{
    uid: string
    createdAt: string
    updateAt: string
    displayName:string
    @Field({nullable: true})
    image: string
    licenceID:string
    @Field({nullable: true})
    companyId: number
}