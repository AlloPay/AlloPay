import { Module } from '@nestjs/common';
import { OperationsResolver } from './operations.resolver';
import { OperationsService } from './operations.service';
import { ContractsModule } from '../contracts/contracts.module';

@Module({
  imports: [ContractsModule],
  exports: [OperationsService],
  providers: [OperationsService, OperationsResolver],
})
export class OperationsModule {}
