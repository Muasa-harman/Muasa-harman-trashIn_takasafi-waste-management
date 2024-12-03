import { Module } from '@nestjs/common';
import { MunicipleAdminService } from './municiple-admin.service';
import { MunicipleAdminResolver } from './municiple-admin.resolver';

@Module({
  providers: [MunicipleAdminService, MunicipleAdminResolver]
})
export class MunicipleAdminModule {}
