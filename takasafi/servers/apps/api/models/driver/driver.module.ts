import { Module } from '@nestjs/common';
import { DriverService } from './driver.service';
import { DriverResolver } from './driver.resolver';

@Module({
  providers: [DriverService, DriverResolver],
  exports:[DriverService]
})
export class DriverModule {}
