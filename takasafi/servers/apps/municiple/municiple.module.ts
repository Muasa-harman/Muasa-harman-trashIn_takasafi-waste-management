import { Module } from '@nestjs/common';
import { MunicipleService } from './municiple.service';
import { MunicipleResolver } from './municiple.resolver';

@Module({
  providers: [MunicipleService, MunicipleResolver]
})
export class MunicipleModule {}
