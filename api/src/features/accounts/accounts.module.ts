import { forwardRef, Module } from '@nestjs/common';
import { FaucetModule } from '../faucet/faucet.module';
import { AccountsResolver } from './accounts.resolver';
import { AccountsService } from './accounts.service';
import { ContractsModule } from '../contracts/contracts.module';
import { PoliciesModule } from '../policies/policies.module';
import { AccountsProcessor } from './accounts.processor';
import { ACCOUNTS_QUEUE } from './accounts.queue';
import { registerBullQueue } from '../util/bull/bull.util';

@Module({
  imports: [
    ...registerBullQueue(ACCOUNTS_QUEUE),
    ContractsModule,
    FaucetModule,
    forwardRef(() => PoliciesModule),
  ],
  exports: [AccountsService],
  providers: [AccountsResolver, AccountsService, AccountsProcessor],
})
export class AccountsModule {}
