import { InputType,Field } from "@nestjs/graphql";
import { IsEmail,IsNotEmpty,IsString,MinLength } from "class-validator";

@InputType()
export class RegisterDto{
    @Field()
    @IsNotEmpty({message:'Name is required.'})
    name:string

    @Field()
    @IsNotEmpty({message:'Password is required.'})
    @MinLength(8,{message:'Password must be at least 8 characters'})
    password:string

    @Field()
    @IsNotEmpty({message:'Email is required.'})
    @IsEmail({}, {message:'Email is required.'})
    email:string

    @Field()
    @IsNotEmpty({message:'Phone number is required'})
    phoneNumber:number
}

@InputType()
export class ActivationDto{
    @Field()
    @IsNotEmpty({message:'Activation is required'})
    activationToken:string;

    @Field()
    @IsNotEmpty({message: 'Activation is required.'})
    activationCode:string
}

@InputType()
export class resetPasswordDto{
    @Field()
    @IsNotEmpty({message:'reset token is required.'})
    resetCode:string
}

@InputType()
export class LoginDto{
    @Field()
    @IsNotEmpty({message:'Email is required.'})
    @IsEmail({},{message:'provide a valid email'})
    email:string;

    @Field()
    @IsNotEmpty({message:'Password is required.'})
    password:string
}

