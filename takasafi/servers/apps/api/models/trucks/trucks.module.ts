import { Module } from '@nestjs/common';
import { TrucksResolver } from './trucks.resolver';

@Module({
  providers: [TrucksResolver]
})
export class TrucksModule {}
