import { Test, TestingModule } from '@nestjs/testing';
import { ContractMethodsService } from './contract-methods.service';

describe('ContractMethodsService', () => {
  let service: ContractMethodsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContractMethodsService],
    }).compile();

    service = module.get<ContractMethodsService>(ContractMethodsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
