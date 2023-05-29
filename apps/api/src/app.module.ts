import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { BlockchainModule } from './blockchain/blockchain.module'
import { ConfigModule } from '@nestjs/config'
import { PrismaModule } from './common/prisma/prisma.module'
import { MeilisearchModule } from './meilisearch/meilisearch.module'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { join } from 'path'
import { InventoriesModule } from './models/inventories/inventories.module'
import { ProductsModule } from './models/products/products.module'
import { PurchasesModule } from './models/purchases/purchases.module'
import { UsersModule } from './models/users/users.module'

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      fieldResolverEnhancers: ['guards'],
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      buildSchemaOptions: {
        numberScalarMode: 'integer',
      },
    }),
    PrismaModule,
    BlockchainModule,
    MeilisearchModule,

    InventoriesModule,
    ProductsModule,
    PurchasesModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
