import { Field,InputType,PartialType } from "@nestjs/graphql";
import { Prisma } from "@prisma/client";
import { DateTimeFilter,RestrictProperties,StringFilter } from "common/dtos/common.input";
import {DriverRelationFilter}