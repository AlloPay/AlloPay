import { Injectable } from '@nestjs/common';
import { ExplorerService } from '../explorer/explorer.service';
import { TransfersInput } from './transfers.args';
import { ExplorerTransfer } from '../explorer/explorer.model';
import { TransferDirection } from '@gen/prisma/transfer-direction.enum';

@Injectable()
export class TransfersService {
  constructor(private explorer: ExplorerService) {}

  async transfers({ account, skip, direction }: TransfersInput): Promise<ExplorerTransfer[]> {
    const transfers = await this.explorer.accountTransfers({ account, limit: skip });

    return direction !== undefined
      ? transfers.filter((t) =>
          direction === TransferDirection.IN ? t.to === account : t.from === account,
        )
      : transfers;
  }
}
