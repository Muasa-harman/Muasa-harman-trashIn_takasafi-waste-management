import { ObjectType,Field,Directive } from "@nestjs/graphql";

@ObjectType()
@Directive('@key(fields:"id")')
export class Avatar{
    @Field()
    id:string
    @Field()
    public_id:string

    @Field()
    url:string;

    @Field()
    driverId:string;
}

@ObjectType()
export class Driver{
    @Field()
    id:string

    @Field()
    name:string;

    @Field()
    email:string

    @Field()
    phoneNumber:number

    @Field()
    password:string;

    @Field(()=>Avatar, {nullable:true})
    avatar?:Avatar | null

    @Field()
    createdAt:Date;

    @Field()
    updatedAt:Date;
}