import { Module } from '@nestjs/common';
import { ManagersService } from './managers.service';
import { ManagersResolver } from './managers.resolver';

@Module({
  providers: [ManagersService, ManagersResolver]
})
export class ManagersModule {}
