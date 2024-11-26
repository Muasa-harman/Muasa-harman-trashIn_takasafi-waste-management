import { Resolver,Query,Mutation,Args,ResolveField,Parent } from "@nestjs/graphql";
import { UsersService } from "./users.service";
import { AuthProvider,User } from "./entity/user.entity";
import { FindManyUserArgs,FindUniqueUserArgs } from "./dtos/find.args";
import { LoginInput,LoginOutput,RegisterWithCredentialsInput,RegisterWithProviderInput } from "./dtos/create-user.input";
import { UpdateUserInput } from "./dtos/update-user";
import { checkRowLevelPermission } from "common/auth/util";
import { GetUserType } from "common/types";
import { AllowAuthenticated } from "common/auth/auth.decorator";
import { PrismaService } from "common/prisma/prisma.service";
// import {Admin}
import { Manager } from "models/managers/entity/manager.entity";
import { Customer } from "models/customers/entity/customer.entity";