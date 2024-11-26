import { Field,Float,InputType,PickType } from "@nestjs/graphql";
import { Booking } from "../entity/booking.entity";
import {Truck} from "@prisma/client"
import {CreateDriverAssignmentInputWithoutBookingId} from ""

@InputType()
export class CreateBookingInput extends PickType(
    Booking,
    ['customerId','vehicleNumber','phoneNumber']
    InputType,
){
    truckId:Truck['id']
    @Field(()=>Float)
    normalPrice?:number
    @Field(()=>Float)
    specialPrice: number;

    driverAssignment?:CreateDriverAssignmentInputWithoutBookingId
}