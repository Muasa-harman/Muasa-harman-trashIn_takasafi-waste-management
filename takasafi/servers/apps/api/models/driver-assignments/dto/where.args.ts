import { InputType,PartialType } from "@nestjs/graphql";
import { Prisma } from "@prisma/client";
import { DateTimeFilter,FloatFilter,IntFilter,RestrictProperties,StringFilter } from "../../../common/dtos/common.input";
import { BookingListRelationFilter } from "../../bookings/dto/where.args"; 
// import {Dri}