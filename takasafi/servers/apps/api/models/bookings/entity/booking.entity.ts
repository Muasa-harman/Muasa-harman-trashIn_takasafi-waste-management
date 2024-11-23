import { Field,ObjectType,registerEnumType } from "@nestjs/graphql";
import { $Enums,Booking as BookingType } from "@prisma/client";
import { RestrictProperties } from "../../../common/dtos/common.input";

registerEnumType($Enums.BookingStatus,{
    name:'BookingStatus',
})

@ObjectType()
export class Booking implements RestrictProperties<Booking,BookingType>{
    id: number
    createdAt: Date
    updateAt: Date
    @Field({nullable: true})
    specialPrice:number
    @Field({nullable: true})
    normalPrice:number
    vehicleNumber:string
    @Field({nullable: true})
    phoneNumber: string
    @Field(()=>$Enums.BookingStatus)
    status:$Enums.BookingStatus
    customerId:string
}