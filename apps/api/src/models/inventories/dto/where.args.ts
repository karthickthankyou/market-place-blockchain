import { Field, InputType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import {
  BoolFilter,
  FloatFilter,
  IntFilter,
  RestrictProperties,
  StringFilter,
} from 'src/common/dtos/common.input'
import { ProductRelationFilter } from 'src/models/products/dto/where.args'
import { PurchaseListRelationFilter } from 'src/models/purchases/dto/where.args'
import { UserRelationFilter } from 'src/models/users/dto/where.args'

@InputType()
export class InventoryWhereUniqueInput
  implements
    RestrictProperties<
      InventoryWhereUniqueInput,
      Prisma.InventoryWhereUniqueInput
    >
{
  @Field(() => Number, { nullable: true })
  id: number
}

@InputType()
export class InventoryWhereInput
  implements
    RestrictProperties<InventoryWhereInput, Prisma.InventoryWhereInput>
{
  @Field(() => IntFilter, { nullable: true })
  id: IntFilter
  @Field(() => StringFilter, { nullable: true })
  ownerId: StringFilter
  @Field(() => IntFilter, { nullable: true })
  productId: IntFilter
  @Field(() => FloatFilter, { nullable: true })
  price: FloatFilter
  @Field(() => IntFilter, { nullable: true })
  quantity: IntFilter
  @Field(() => IntFilter, { nullable: true })
  minOrder: IntFilter
  @Field(() => BoolFilter, { nullable: true })
  listed: BoolFilter
  @Field(() => UserRelationFilter, { nullable: true })
  owner: UserRelationFilter
  @Field(() => ProductRelationFilter, { nullable: true })
  product: ProductRelationFilter
  @Field(() => PurchaseListRelationFilter, { nullable: true })
  purchases: PurchaseListRelationFilter

  @Field(() => [InventoryWhereInput], { nullable: true })
  AND: InventoryWhereInput[]
  @Field(() => [InventoryWhereInput], { nullable: true })
  OR: InventoryWhereInput[]
  @Field(() => [InventoryWhereInput], { nullable: true })
  NOT: InventoryWhereInput[]
}

@InputType()
export class InventoryListRelationFilter {
  @Field(() => InventoryWhereInput, { nullable: true })
  every: InventoryWhereInput
  @Field(() => InventoryWhereInput, { nullable: true })
  some: InventoryWhereInput
  @Field(() => InventoryWhereInput, { nullable: true })
  none: InventoryWhereInput
}

@InputType()
export class InventoryRelationFilter {
  @Field(() => InventoryWhereInput, { nullable: true })
  is: InventoryWhereInput
  @Field(() => InventoryWhereInput, { nullable: true })
  isNot: InventoryWhereInput
}
