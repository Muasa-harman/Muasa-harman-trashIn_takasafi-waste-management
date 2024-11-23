import { ArgsType,Field,registerEnumType,PartialType } from "@nestjs/graphql";
import { Prisma } from "@prisma/client";
import { AddressOrderByWithRelationInput } from "./order-by.args";
import {Address}