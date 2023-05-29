import { Field, InputType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import { RestrictProperties } from 'src/common/dtos/common.input'
import { InventoryOrderByRelationAggregateInput } from 'src/models/inventories/dto/orderBy.args'
import { PurchaseOrderByRelationAggregateInput } from 'src/models/purchases/dto/orderBy.args'

@InputType()
export class UserOrderByWithRelationInput
  implements
    RestrictProperties<
      UserOrderByWithRelationInput,
      Prisma.UserOrderByWithRelationInput
    >
{
  @Field(() => Prisma.SortOrder, { nullable: true })
  wallet: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  name: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  contact: Prisma.SortOrder
  @Field(() => InventoryOrderByRelationAggregateInput, { nullable: true })
  inventory: InventoryOrderByRelationAggregateInput
  @Field(() => PurchaseOrderByRelationAggregateInput, { nullable: true })
  sold: PurchaseOrderByRelationAggregateInput
  @Field(() => PurchaseOrderByRelationAggregateInput, { nullable: true })
  purchased: PurchaseOrderByRelationAggregateInput
}

@InputType()
export class UserOrderByRelationAggregateInput {
  @Field(() => Prisma.SortOrder, { nullable: true })
  _count: Prisma.SortOrder
}
