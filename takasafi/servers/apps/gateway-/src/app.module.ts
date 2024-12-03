import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from '@nestjs/apollo';
import { IntrospectAndCompose } from '@apollo/gateway';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloGatewayDriverConfig>({
      driver: ApolloGatewayDriver,
      gateway: {
        supergraphSdl: new IntrospectAndCompose({
           subgraphs: [
            {
              name: 'users',
              url: 'http://localhost:3001/graphql',
            },
            {
              name: 'admin',
              url: 'http://localhost:4002/graphql',
            },
            {
              name: 'driver',
              url: 'http://localhost:3003/graphql',
            },
            {
              name: 'municipal',
              url: 'http://localhost:4004/graphql',
            },
            {
              name: 'company',
              url: 'http://localhost:4005/graphql',
            },
           ], }),
      },
    }),
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
