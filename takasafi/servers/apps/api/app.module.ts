import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { MAX_AGE } from "./common/util";
import {ConfigModule} from '@nestjs/config';
import { GraphQLModule } from "@nestjs/graphql";
import { join } from "path";
import { PrismaModule } from "./common/prisma/prisma.module";


@Module({
    imports:[
        ConfigModule.forRoot(),
        JwtModule.register({
            global: true,
            secret:process.env.JWT_SECRET,
            signOptions: {expiresIn:MAX_AGE},
        }),
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver:ApolloDriver,
            introspection:true,
            fieldResolverEnhancers:['guards'],
            autoSchemaFile: join(process.cwd(), 'src/schema.gql')
        }),
        PrismaModule,
        // mpesa
        UsersModule,
    ],
})