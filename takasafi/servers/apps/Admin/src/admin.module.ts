import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { GraphQLModule } from "@nestjs/graphql";
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from "@nestjs/apollo";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "../prisma/prisma.service";
import { EmailModule } from "./email/email.module";
import { AdminResolver } from "./admin.resolver";
// import { FoodsResolver } from "./foods/foods.resolver";
import { CloudinaryService } from "./cloudinary/cloudinary.service";
import { CloudinaryModule } from "./cloudinary/cloudinary.module";
import { AdminService } from "./admin.service";


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: {
        federation: 2,
      },
    }),
    EmailModule,
    CloudinaryModule
  ],
  controllers: [],
  providers: [
    AdminService,
    ConfigService,
    JwtService,
    PrismaService,
    AdminResolver,
    CloudinaryService,
  ],
})
export class adminModule {}
