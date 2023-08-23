import { Test, TestingModule } from '@nestjs/testing';
import { MessageProposalsService } from './message-proposals.service';
import { createMock } from '@golevelup/ts-jest';

describe('MessageProposalsService', () => {
  let service: MessageProposalsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MessageProposalsService],
    })
      .useMocker(createMock)
      .compile();

    service = module.get<MessageProposalsService>(MessageProposalsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
