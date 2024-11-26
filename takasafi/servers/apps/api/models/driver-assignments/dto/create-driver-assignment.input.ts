import { InputType,OmitType } from "@nestjs/graphql";
import { DriverAssignment } from "../entity/create-valet-assignment";

@InputType()
export class CreateDriverAssignmentInput extends OmitType(
    DriverAssignment,
    ['createdAt','updatedAt'],
    InputType,
){}

@InputType()
export class CreateDriverAssignmentInputWithoutBookingId{
    pickupLat:number
    pickupLng:number
}