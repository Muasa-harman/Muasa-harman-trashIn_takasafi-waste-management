import { InputType,PickType } from "@nestjs/graphql";
import { Truck } from "../entity/truck.entity";
import { CreateAddressInputWithoutTruckId } from "models/addresses/dto/create-address.input";

@InputType()
export class CreateTruckInput extends PickType(
    Truck,
    ['description','displayName','images'],
    InputType,
){
    Address:CreateAddressInputWithoutTruckId
}