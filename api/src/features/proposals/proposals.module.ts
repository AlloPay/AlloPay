import { Module } from '@nestjs/common';
import { ExpoModule } from '~/features/util/expo/expo.module';
import { TransactionsModule } from '../transactions/transactions.module';
import { ProposalsResolver } from './proposals.resolver';
import { ProposalsService } from './proposals.service';

@Module({
  imports: [ExpoModule, TransactionsModule],
  exports: [ProposalsService],
  providers: [ProposalsResolver, ProposalsService],
})
export class ProposalsModule {}
