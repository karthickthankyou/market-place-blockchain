import { Controller, Get } from '@nestjs/common'
import { BlockchainService } from './blockchain.service'

@Controller('blockchain')
export class BlockChainController {
  constructor(private readonly blockchain: BlockchainService) {}
  @Get()
  getMessage() {
    return 'Hello blockchain.'
  }
}
