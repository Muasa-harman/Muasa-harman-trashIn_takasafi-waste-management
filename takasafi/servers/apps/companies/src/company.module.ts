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
import { CompanyResolver } from "./company.resolver";
import { CloudinaryService } from "./cloudinary/cloudinary.service";
import { CloudinaryModule } from "./cloudinary/cloudinary.module";
import { CompanyService } from "./company.service";
import { TracksResolver } from "./trucks/tracks.resolver";
import { TracksService } from "./trucks/tracks.service";

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
    CompanyService,
    ConfigService,
    JwtService,
    PrismaService,
    CompanyResolver,
    TracksResolver,
    TracksService,
    CloudinaryService,
  ],
})
export class companyModule {}
