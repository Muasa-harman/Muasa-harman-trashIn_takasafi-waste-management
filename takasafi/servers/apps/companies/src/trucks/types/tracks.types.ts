import { Field, ObjectType } from "@nestjs/graphql";
import { ErrorType } from "../../types/company.type";
import { Track } from "../entities/tracks.entities";
// import {Tracks} from "prisma/prisma-client"

@ObjectType()
export class CreateTrackResponse {
  @Field()
  message: string;

  @Field(() => ErrorType, { nullable: true })
  error?: ErrorType;
}

@ObjectType()
export class LoggedInCompanyTrackResponse {
  @Field(() => [Track], { nullable: true })
  tracks: Track;

  @Field(() => ErrorType, { nullable: true })
  error?: ErrorType;
}

@ObjectType()
export class DeleteTrackResponse {
  @Field()
  message: string;

  @Field(() => ErrorType, { nullable: true })
  error?: ErrorType;
}
