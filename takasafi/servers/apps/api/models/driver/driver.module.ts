import { Module } from '@nestjs/common';
import { DriverService } from './driver.service';
import { DriverResolver } from './driver.resolver';

@Module({
  providers: [DriverService, DriverResolver]
})
export class DriverModule {}
