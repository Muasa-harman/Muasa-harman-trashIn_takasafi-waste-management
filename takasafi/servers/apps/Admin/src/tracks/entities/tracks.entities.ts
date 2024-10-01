import { Field, ObjectType } from "@nestjs/graphql";
import { FieldsOnCorrectTypeRule } from "graphql";

@ObjectType()
export class Images {
  @Field()
  public_id: string;

  @Field()
  url: string;
}

@ObjectType()
export class Track {
  @Field()
  id?: string;

  @Field()
  name: string;

  @Field()
  number_plate: string;

  @Field()
  driver: string;

  @Field()
  description: string;

  @Field()
  mobile: string;

  @Field()
  price: number;

  @Field()
  category: string;

  @Field(() => [Images])
  images: Images[];

  @Field()
  companyId: string;

  @Field()
  createdAt?: Date;

  @Field()
  updatedAt?: Date;
}
