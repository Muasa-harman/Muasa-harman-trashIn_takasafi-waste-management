import { Field,ObjectType } from "@nestjs/graphql";
import {Manager as ManagerType} from '@prisma/client'
import { RestrictProperties } from "../../../common/dtos/common.input";

@ObjectType()
export class Manager implements RestrictProperties<Manager, ManagerType>{
    uid: string
    createdAt: string
    updatedAt: string
    @Field({nullable: true})
    displayName: string
    companyId:string
}