import { Module } from '@nestjs/common'
import { BlockchainService } from './blockchain.service'
import { BlockChainController } from './blockchain.controller'

@Module({
  imports: [],
  providers: [BlockchainService],
  controllers: [BlockChainController],
})
export class BlockchainModule {}
