import { InputType,OmitType } from "@nestjs/graphql";
import { Driver } from "../entity/driver.entity";

@InputType()
export class CreateDriverInput extends OmitType(
    Driver,
    ['createdAt','updateAt'],
    InputType,
){}