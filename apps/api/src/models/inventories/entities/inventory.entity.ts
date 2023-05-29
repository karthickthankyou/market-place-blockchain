import { ObjectType } from '@nestjs/graphql'
import { Inventory as InventoryType } from '@prisma/client'
import { RestrictProperties } from 'src/common/dtos/common.input'

@ObjectType()
export class Inventory implements RestrictProperties<Inventory, InventoryType> {
  id: number
  ownerId: string
  productId: number
  price: number
  quantity: number
  minOrder: number
  listed: boolean
  // Todo fill all properties. To make it nullable add below.
  // @Field(() => String, { nullable: true })
}
