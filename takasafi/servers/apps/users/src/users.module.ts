import { Module } from '@nestjs/common';
// import { UsersService } from './user.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriverConfig, ApolloFederationDriver } from '@nestjs/apollo';
import {ConfigService} from '@nestjs/config';
import {JwtService} from '@nestjs/jwt'
import { UsersService } from './users.service';
import { PrismaService }  from '../../../prisma/Prisma.service'
import { UsersResolver } from './user.resolver';
import { EmailModule } from './email/email.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: {
        federation: 2,
      },
    }),
    EmailModule,
  ],
  controllers: [],
  providers: [UsersService,ConfigService,JwtService,PrismaService,UsersResolver],
})
export class UsersModule {}
