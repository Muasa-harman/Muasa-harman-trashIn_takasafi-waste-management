import { InputType,PartialType } from "@nestjs/graphql";
import { Prisma } from "@prisma/client";
import { DateTimeFilter,FloatFilter,RestrictProperties,StringFilter } from "common/dtos/common.input";
import { TruckRelationFilter } from "models/trucks/dto/where.args";

@InputType()
export class AddressWhereUniqueInput{}