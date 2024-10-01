import { Field, InputType } from "@nestjs/graphql";
import { ArrayNotEmpty, IsArray, IsNotEmpty, IsString } from "class-validator";

@InputType()
export class CreateTrackDto {
  @Field()
  @IsNotEmpty({ message: "Track Name is required." })
  @IsString({ message: "Track Name must need to be one string." })
  name: string;

  @Field()
  @IsNotEmpty({ message: "Track plate number is required." })
  @IsString({ message: "Track plate number must be one string." })
  number_plate: string;

  @Field()
  @IsNotEmpty({message:"Track driver name is required"})
  @IsString({message: "Track driver name must be one string. "})
  driver: string;

  @Field()
  @IsNotEmpty({message: "Driver mobile number is required"})
  @IsString({message: "Driver mobile number must be one string"})
  mobile: string;

  @Field()
  @IsNotEmpty({message: "a brief description is required"})
  @IsString({message: "The description must be one string"})
  description: string;

  @Field()
  @IsNotEmpty({ message: "Track price is required." })
  price: number;


  @Field()
  @IsNotEmpty({ message: "waste category is required." })
  @IsString({ message: "Waste category must need to be one string." })
  category: string;

  @Field(() => [String])
  @IsArray({ message: "Track images must be an array." })
  @ArrayNotEmpty({ message: "Track images array must not be empty." })
  images: string[];
}

@InputType()
export class DeleteTrackDto {
  @Field()
  @IsNotEmpty({ message: "Track id is required." })
  @IsString({ message: "Track id must need to be one string." })
  id: string;
}
