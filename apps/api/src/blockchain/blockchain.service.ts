import { Injectable } from '@nestjs/common'
import Web3 from 'web3'

import { AbiItem } from 'web3-utils'
import {
  contractAbi,
  contractAddress,
} from '@market-place-blockchain/contract-info'
import { PrismaService } from 'src/common/prisma/prisma.service'
import { MeilisearchService } from 'src/meilisearch/meilisearch.service'

@Injectable()
export class BlockchainService {
  private readonly web3: Web3
  private readonly contract: any // Replace with your contract type

  constructor(
    private readonly prisma: PrismaService,
    private readonly meili: MeilisearchService,
  ) {
    this.web3 = new Web3(process.env.WSS_URL)
    console.log('contractAbi', contractAbi, contractAddress)
    this.contract = new this.web3.eth.Contract(
      contractAbi as AbiItem[],
      contractAddress,
    )

    this.eventUserRegistered()
    this.eventProductRegistered()
    this.eventProductPurchased()
    this.eventInventoryCreated()

    this.eventUpdateInventory()
  }
  private eventProductRegistered() {
    this.contract.events
      .ProductRegistered(
        {
          fromBlock: 'latest',
        },
        async (error, event) => {
          console.log('2. Event. Product registered: ', event)
          const {
            id,
            inventoryId,
            name,
            description,
            images,
            owner,
            price,
            quantity,
            minOrder,
            listed,
          } = event.returnValues

          const product = await this.prisma.product.create({
            data: { name, description, id: +id, images },
          })

          const meiliProduct = await this.meili.addToIndex([
            { name, description, id },
          ])
          const inventory = await this.prisma.inventory.create({
            data: {
              productId: +id,
              id: +inventoryId,
              quantity: +quantity,
              price: +price,
              minOrder: +minOrder,
              ownerId: owner,
              listed,
            },
          })
        },
      )
      .on('connected', (str) =>
        console.log('ProductRegistered. Connected: ', str),
      )
  }

  private eventUserRegistered() {
    this.contract.events
      .UserRegistered(
        {
          fromBlock: 'latest',
        },
        async (error, event) => {
          if (event) {
            const { owner, name, contactInfo } = event.returnValues
            const user = await this.prisma.user.create({
              data: { contact: contactInfo, name, wallet: owner },
            })
          }
          console.log('Event. UserRegistered: ', event.returnValues, error)
          // Add your logic here
        },
      )
      .on('connected', (str) => console.log('UserRegistered. Connected: ', str))
  }

  private eventInventoryCreated() {
    this.contract.events
      .InventoryCreated(
        {
          fromBlock: 'latest',
        },
        async (error, event) => {
          if (event) {
            const { id, owner, productId, price, quantity, minOrder, listed } =
              event.returnValues
            const inventory = await this.prisma.inventory.create({
              data: {
                id: +id,
                listed,
                ownerId: owner,
                productId: +productId,
                price: +price,
                quantity: +quantity,
                minOrder: +minOrder,
              },
            })
          }
          console.log('Event. InventoryCreated: ', event.returnValues, error)
        },
      )
      .on('connected', (str) =>
        console.log('InventoryCreated. Connected: ', str),
      )
  }

  private eventUpdateInventory() {
    this.contract.events
      .UpdateInventory(
        {
          fromBlock: 'latest',
        },
        async (error, event) => {
          if (event) {
            const { inventoryId, quantity } = event.returnValues
            const inventory = await this.prisma.inventory.update({
              data: { quantity: +quantity },
              where: { id: +inventoryId },
            })
          }
          console.log('Event. UpdateInventory: ', event.returnValues, error)
        },
      )
      .on('connected', (str) =>
        console.log('UpdateInventory. Connected: ', str),
      )
  }

  private eventProductPurchased() {
    this.contract.events
      .ProductPurchased(
        {
          fromBlock: 'latest',
        },
        async (error, event) => {
          if (event) {
            const {
              seller,
              buyer,
              sellerInventoryId,
              buyerInventoryId,
              quantity,
              unitPrice,
              totalPrice,
              timestamp,
            } = event.returnValues
            const purchase = await this.prisma.purchase.create({
              data: {
                transactionHash: event.transactionHash,
                Inventory: {
                  connect: [
                    { id: +buyerInventoryId },
                    { id: +sellerInventoryId },
                  ],
                },
                seller: { connect: { wallet: seller } },
                buyer: { connect: { wallet: buyer } },
                quantity: +quantity,
                unitPrice: +unitPrice,
                totalPrice: +totalPrice,
                timestamp: +timestamp,
              },
            })
          }
          console.log('Event. ProductPurchased: ', event.returnValues, error)
        },
      )
      .on('connected', (str) =>
        console.log('ProductPurchased. Connected: ', str),
      )
  }
}
