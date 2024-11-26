import { Module } from '@nestjs/common';
import { VerificationsService } from './verifications.service';
import { VerificationsResolver } from './verifications.resolver';

@Module({
  providers: [VerificationsService, VerificationsResolver],
  exports:[VerificationsService],
})
export class VerificationsModule {}
