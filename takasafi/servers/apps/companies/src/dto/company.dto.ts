import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

@InputType()
export class RegisterDto {
  @Field()
  @IsNotEmpty({ message: 'Company Name is required.' })
  @IsString({ message: 'Company Name must need to be one string.' })
  name: string;

  @Field()
  @IsNotEmpty({ message: 'Company region is required.' })
  @IsString({ message: 'Company region must need to be one string.' })
  country: string;

  @Field()
  @IsNotEmpty({ message: 'Company city is required.' })
  @IsString({ message: 'Company city must need to be one string.' })
  city: string;

  @Field()
  @IsNotEmpty({ message: 'Company city is required.' })
  @IsString({ message: 'Company city must need to be one string.' })
  address: string;

  @Field()
  @IsNotEmpty({ message: 'Company Email is required.' })
  @IsEmail({}, { message: 'Company Email is invalid.' })
  email: string;

  @Field()
  @IsNotEmpty({ message: 'Company Phone Number is required.' })
  phone_number: number;

  @Field()
  @IsNotEmpty({ message: 'Company Password is required.' })
  @MinLength(8, {
    message: 'Company Password must be at least 8 characters.',
  })
  password: string;
}


@InputType()
export class ActivationDto {
  @Field()
  @IsNotEmpty({ message: 'Activation Token is required.' })
  activationToken: string;
}

@InputType()
export class LoginDto {
  @Field()
  @IsNotEmpty({ message: 'Email is required.' })
  @IsEmail({}, { message: 'Email must be valid.' })
  email: string;

  @Field()
  @IsNotEmpty({ message: 'Password is required.' })
  password: string;
}
