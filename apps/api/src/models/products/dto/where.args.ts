import { Field, InputType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import {
  IntFilter,
  RestrictProperties,
  StringFilter,
} from 'src/common/dtos/common.input'
import { InventoryListRelationFilter } from 'src/models/inventories/dto/where.args'

@InputType()
export class ProductWhereUniqueInput
  implements
    RestrictProperties<ProductWhereUniqueInput, Prisma.ProductWhereUniqueInput>
{
  @Field(() => Number, { nullable: true })
  id: number
}

@InputType()
export class ProductWhereInput
  implements RestrictProperties<ProductWhereInput, Prisma.ProductWhereInput>
{
  @Field(() => IntFilter, { nullable: true })
  id: IntFilter
  @Field(() => StringFilter, { nullable: true })
  name: StringFilter
  @Field(() => StringFilter, { nullable: true })
  description: StringFilter
  @Field(() => StringFilter, { nullable: true })
  images: StringFilter
  @Field(() => InventoryListRelationFilter, { nullable: true })
  Inventory: InventoryListRelationFilter

  @Field(() => [ProductWhereInput], { nullable: true })
  AND: ProductWhereInput[]
  @Field(() => [ProductWhereInput], { nullable: true })
  OR: ProductWhereInput[]
  @Field(() => [ProductWhereInput], { nullable: true })
  NOT: ProductWhereInput[]
}

@InputType()
export class ProductListRelationFilter {
  @Field(() => ProductWhereInput, { nullable: true })
  every: ProductWhereInput
  @Field(() => ProductWhereInput, { nullable: true })
  some: ProductWhereInput
  @Field(() => ProductWhereInput, { nullable: true })
  none: ProductWhereInput
}

@InputType()
export class ProductRelationFilter {
  @Field(() => ProductWhereInput, { nullable: true })
  is: ProductWhereInput
  @Field(() => ProductWhereInput, { nullable: true })
  isNot: ProductWhereInput
}
