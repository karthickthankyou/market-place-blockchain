import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { BlockchainModule } from './blockchain/blockchain.module'
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [ConfigModule.forRoot(), BlockchainModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
