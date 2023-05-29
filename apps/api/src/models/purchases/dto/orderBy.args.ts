import { Field, InputType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import { RestrictProperties } from 'src/common/dtos/common.input'
import { InventoryOrderByRelationAggregateInput } from 'src/models/inventories/dto/orderBy.args'
import { UserOrderByWithRelationInput } from 'src/models/users/dto/orderBy.args'

@InputType()
export class PurchaseOrderByWithRelationInput
  implements
    RestrictProperties<
      PurchaseOrderByWithRelationInput,
      Prisma.PurchaseOrderByWithRelationInput
    >
{
  @Field(() => Prisma.SortOrder, { nullable: true })
  transactionHash: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  buyerId: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  sellerId: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  unitPrice: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  quantity: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  totalPrice: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  timestamp: Prisma.SortOrder
  @Field(() => UserOrderByWithRelationInput, { nullable: true })
  buyer: UserOrderByWithRelationInput
  @Field(() => UserOrderByWithRelationInput, { nullable: true })
  seller: UserOrderByWithRelationInput
  @Field(() => InventoryOrderByRelationAggregateInput, { nullable: true })
  Inventory: InventoryOrderByRelationAggregateInput
}

@InputType()
export class PurchaseOrderByRelationAggregateInput {
  @Field(() => Prisma.SortOrder, { nullable: true })
  _count: Prisma.SortOrder
}
