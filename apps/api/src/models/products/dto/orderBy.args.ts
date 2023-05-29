import { Field, InputType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import { RestrictProperties } from 'src/common/dtos/common.input'
import { InventoryOrderByRelationAggregateInput } from 'src/models/inventories/dto/orderBy.args'

@InputType()
export class ProductOrderByWithRelationInput
  implements
    RestrictProperties<
      ProductOrderByWithRelationInput,
      Prisma.ProductOrderByWithRelationInput
    >
{
  @Field(() => Prisma.SortOrder, { nullable: true })
  id: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  name: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  description: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  images: Prisma.SortOrder
  @Field(() => InventoryOrderByRelationAggregateInput, { nullable: true })
  Inventory: InventoryOrderByRelationAggregateInput
  // Todo: Add properties
  // @Field(() => Prisma.SortOrder, { nullable: true })
  // id: Prisma.SortOrder
}

@InputType()
export class ProductOrderByRelationAggregateInput {
  @Field(() => Prisma.SortOrder, { nullable: true })
  _count: Prisma.SortOrder
}
