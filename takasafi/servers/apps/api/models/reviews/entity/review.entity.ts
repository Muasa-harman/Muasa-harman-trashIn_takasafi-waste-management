import { Field,ObjectType } from "@nestjs/graphql";
import { Reviews as ReviewType } from "@prisma/client";
import { RestrictProperties } from "common/dtos/common.input";

@ObjectType()
export class Review implements RestrictProperties<Review, ReviewType>{
    id:number
    createdAt:Date
    updateAt:Date
    rating:number
    @Field({nullable:true})
    comment:string
    customerId:string
    truckId:string
}