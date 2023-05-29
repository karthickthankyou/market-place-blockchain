import { ObjectType } from '@nestjs/graphql'
import { Purchase as PurchaseType } from '@prisma/client'
import { RestrictProperties } from 'src/common/dtos/common.input'

@ObjectType()
export class Purchase implements RestrictProperties<Purchase, PurchaseType> {
  transactionHash: string
  buyerId: string
  sellerId: string
  unitPrice: number
  quantity: number
  totalPrice: number
  timestamp: number
  // Todo fill all properties. To make it nullable add below.
  // @Field(() => String, { nullable: true })
}
