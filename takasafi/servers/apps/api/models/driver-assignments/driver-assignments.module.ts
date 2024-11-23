import { Module } from '@nestjs/common';
import { DriverAssignmentsService } from './driver-assignments.service';
import { DriverAssignmentsResolver } from './driver-assignments.resolver';

@Module({
  providers: [DriverAssignmentsService, DriverAssignmentsResolver],
  exports:[DriverAssignmentsService],
})
export class DriverAssignmentsModule {}
