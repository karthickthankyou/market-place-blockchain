import { Field, InputType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import { RestrictProperties } from 'src/common/dtos/common.input'
import { ProductOrderByWithRelationInput } from 'src/models/products/dto/orderBy.args'
import { PurchaseOrderByRelationAggregateInput } from 'src/models/purchases/dto/orderBy.args'
import { UserOrderByWithRelationInput } from 'src/models/users/dto/orderBy.args'

@InputType()
export class InventoryOrderByWithRelationInput
  implements
    RestrictProperties<
      InventoryOrderByWithRelationInput,
      Prisma.InventoryOrderByWithRelationInput
    >
{
  @Field(() => Prisma.SortOrder, { nullable: true })
  id: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  ownerId: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  productId: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  price: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  quantity: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  minOrder: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  listed: Prisma.SortOrder
  @Field(() => UserOrderByWithRelationInput, { nullable: true })
  owner: UserOrderByWithRelationInput
  @Field(() => ProductOrderByWithRelationInput, { nullable: true })
  product: ProductOrderByWithRelationInput
  @Field(() => PurchaseOrderByRelationAggregateInput, { nullable: true })
  purchases: PurchaseOrderByRelationAggregateInput

  // Todo: Add properties
  // @Field(() => Prisma.SortOrder, { nullable: true })
  // id: Prisma.SortOrder
}

@InputType()
export class InventoryOrderByRelationAggregateInput {
  @Field(() => Prisma.SortOrder, { nullable: true })
  _count: Prisma.SortOrder
}
