import { Field, ObjectType } from "@nestjs/graphql";
import { Driver } from "../entities/driver.entity";

@ObjectType()
export class ErrorType{
    @Field()
    message:string

    @Field({nullable:true})
    code?:string
}

@ObjectType()
export class RegisterResponse{
    @Field()
    activation_token:string;

    @Field(()=>ErrorType,{nullable:true})
    error?:ErrorType;
    
}

@ObjectType()
export class ActivationResponse{
    @Field(()=>Driver,{nullable:true})
    driver?: Driver | any;
}

ObjectType()
export class ForgotPasswordResponse{
    @Field(()=>Driver)
    driver:Driver | any;
}

@ObjectType()
export class LoginResponse{
    @Field(()=>Driver,{nullable:true})
    driver?:Driver;

    @Field({nullable:true})
    accessToken?:string;

    @Field({nullable:true})
    refreshToken?:string;

    @Field(()=>ErrorType,{nullable:true})
    error?:ErrorType;
}

@ObjectType()
export class LogoutResponse{
    @Field()
    message?:string;
}