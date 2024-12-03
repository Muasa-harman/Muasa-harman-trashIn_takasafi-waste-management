import { Module } from '@nestjs/common';
import { TruckRouteService } from './truck-route.service';
import { TruckRouteResolver } from './truck-route.resolver';

@Module({
  providers: [TruckRouteService, TruckRouteResolver]
})
export class TruckRouteModule {}
