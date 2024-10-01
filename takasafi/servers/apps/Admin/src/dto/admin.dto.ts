import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

@InputType()
export class RegisterDto {
  @Field()
  @IsNotEmpty({ message: 'Admin Name is required.' })
  @IsString({ message: 'Admin Name must need to be one string.' })
  name: string;

  @Field()
  @IsNotEmpty({ message: 'Admin region is required.' })
  @IsString({ message: 'Admin region must need to be one string.' })
  country: string;

  @Field()
  @IsNotEmpty({ message: 'Admin city is required.' })
  @IsString({ message: 'Admin city must need to be one string.' })
  city: string;

  @Field()
  @IsNotEmpty({ message: 'Admin city is required.' })
  @IsString({ message: 'Admin city must need to be one string.' })
  address: string;

  @Field()
  @IsNotEmpty({ message: 'admin Email is required.' })
  @IsEmail({}, { message: 'admin Email is invalid.' })
  email: string;

  @Field()
  @IsNotEmpty({ message: 'Admin Phone Number is required.' })
  phone_number: number;

  @Field()
  @IsNotEmpty({ message: 'Admin Password is required.' })
  @MinLength(8, {
    message: 'Admin Password must be at least 8 characters.',
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
