import { Field, InputType,ObjectType } from "@nestjs/graphql";
import {DriverAssignment as DriverAssignmentType} from "@prisma/client"
import { RestrictProperties } from "common/dtos/common.input";

@ObjectType()
export class DriverAssignment implements RestrictProperties<DriverAssignment,DriverAssignmentType>{
    bookingId:number
    createdAt:Date
    updatedAt:Date
    pickupLAt:number
    pickupLng:number
    @Field({nullable: true})
    pickupDriverId:string
}