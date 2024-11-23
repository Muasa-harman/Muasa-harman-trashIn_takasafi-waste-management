import { CreateTruckInput } from "./create-truck.input";
import { InputType,PartialType } from "@nestjs/graphql";
import {Truck} from "@prisma/client"

@InputType()
export class UpdateTruckInput extends PartialType(CreateTruckInput){
    id:Truck['id']
}