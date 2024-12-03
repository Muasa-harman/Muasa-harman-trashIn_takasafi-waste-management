import { Module } from '@nestjs/common';
import { DriverService } from './driver.service';
import { DriverResolver } from './driver.resolver';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriverConfig, ApolloFederationDriver } from '@nestjs/apollo';
import { EmailModule } from './email/email.module';
import { ConfigService } from '@nestjs/config';
import { PrismaService }  from '../../../prisma/Prisma.service';
import { JwtService } from '@nestjs/jwt';
import { EmailService } from './email/email.service';


@Module({
  imports:[
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver:ApolloFederationDriver,
      autoSchemaFile:{
        federation:2,
      },
    }),
    EmailModule,
  ],
  providers: [DriverService, DriverResolver,ConfigService,JwtService,EmailService,PrismaService]
})
export class DriverModule {}
