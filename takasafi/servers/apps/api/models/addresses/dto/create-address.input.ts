import { InputType,OmitType,PickType } from "@nestjs/graphql";
import { Addresss } from "../entity/address.entity";

@InputType()
export class CreateAddressInput extends OmitType(
    Addresss,
    ['createdAt','updatedAt','id'],
    InputType,
){}

@InputType()
export class CreateAddressInputWithoutTruckId extends PickType(
    CreateAddressInput,
    ['address','lat','lng']
){}