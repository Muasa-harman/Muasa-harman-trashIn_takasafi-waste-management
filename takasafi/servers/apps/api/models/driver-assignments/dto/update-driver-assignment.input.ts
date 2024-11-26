import { CreateDriverAssignmentInput } from "./create-driver-assignment.input"; 
import { InputType,PartialType } from "@nestjs/graphql";
import {DriverAssignment} from "@prisma/client"

@InputType()
export class UpdateDriverAssignmentInput extends PartialType(
    CreateDriverAssignmentInput,
){
    bookingId: DriverAssignment['bookingId'];
}