import { Module } from '@nestjs/common';
import { AddressesResolver } from './addresses.resolver';

@Module({
  providers: [AddressesResolver]
})
export class AddressesModule {}
