import { Args, Context, Mutation, Query, Resolver } from "@nestjs/graphql";
import { TracksService } from "./tracks.service";
import {
  CreateTrackResponse,
  DeleteTrackResponse,
  LoggedInCompanyTrackResponse,
} from "./types/tracks.types";
import { UseGuards } from "@nestjs/common";
import { AuthGuard } from "../guards/auth.guard";
import { Request, Response } from "express";
import {  CreateTrackDto, DeleteTrackDto } from "./dto/tracks.dto";

@Resolver("Tracks")
export class TracksResolver {
  constructor(private readonly tracksService: TracksService) {}

  @Mutation(() => CreateTrackResponse)
  @UseGuards(AuthGuard)
  async createTrack(
    @Context() context: { req: Request; res: Response },
    @Args("createTrackDto") createTrackDto: CreateTrackDto
  ) {
    return await this.tracksService.createTrack(
      createTrackDto,
      context.req,
      context.res
    );
  }

  @Query(() => LoggedInCompanyTrackResponse)
  @UseGuards(AuthGuard)
  async getLoggedInCompanyTracks(
    @Context() context: { req: any; res: Response }
  ) {
    return await this.tracksService.getLoggedInCompanyTrack(
      context.req,
      context.res
    );
  }

  @Mutation(() => DeleteTrackResponse)
  @UseGuards(AuthGuard)
  async deleteTrack(
    @Context() context: { req: any },
    @Args("deleteTrackDto") deleteTrackDto: DeleteTrackDto
  ) {
    return this.tracksService.deleteTrack(deleteTrackDto, context.req);
  }
}
