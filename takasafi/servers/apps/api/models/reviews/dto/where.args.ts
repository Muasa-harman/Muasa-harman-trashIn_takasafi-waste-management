import { InputType,PartialType } from "@nestjs/graphql";
import { Prisma } from "@prisma/client";
import { DateTimeFilter,IntFilter,RestrictProperties,StringFilter } from "../../../common/dtos/common.input";
// import {CustomerRelationFilter}