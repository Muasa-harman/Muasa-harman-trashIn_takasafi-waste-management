import {Driver} from '@prisma/client'
import { InputType,PartialType } from '@nestjs/graphql'
import { CreateDriverInput } from './create-driver.input'

@InputType()
export class UpdateDriverInput extends PartialType(CreateDriverInput){
    uid?: Driver['uid']
}