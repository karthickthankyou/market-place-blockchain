import { Field, InputType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import {
  IntFilter,
  RestrictProperties,
  StringFilter,
} from 'src/common/dtos/common.input'
import { InventoryListRelationFilter } from 'src/models/inventories/dto/where.args'
import { UserRelationFilter } from 'src/models/users/dto/where.args'

@InputType()
export class PurchaseWhereUniqueInput
  implements
    RestrictProperties<
      PurchaseWhereUniqueInput,
      Prisma.PurchaseWhereUniqueInput
    >
{
  @Field(() => StringFilter, { nullable: true })
  transactionHash: string
}

@InputType()
export class PurchaseWhereInput
  implements RestrictProperties<PurchaseWhereInput, Prisma.PurchaseWhereInput>
{
  @Field(() => StringFilter, { nullable: true })
  transactionHash: StringFilter
  @Field(() => StringFilter, { nullable: true })
  buyerId: StringFilter
  @Field(() => StringFilter, { nullable: true })
  sellerId: StringFilter
  @Field(() => IntFilter, { nullable: true })
  unitPrice: IntFilter
  @Field(() => IntFilter, { nullable: true })
  quantity: IntFilter
  @Field(() => IntFilter, { nullable: true })
  totalPrice: IntFilter
  @Field(() => IntFilter, { nullable: true })
  timestamp: IntFilter
  @Field(() => UserRelationFilter, { nullable: true })
  buyer: UserRelationFilter
  @Field(() => UserRelationFilter, { nullable: true })
  seller: UserRelationFilter
  @Field(() => InventoryListRelationFilter, { nullable: true })
  Inventory: InventoryListRelationFilter

  @Field(() => [PurchaseWhereInput], { nullable: true })
  AND: PurchaseWhereInput[]
  @Field(() => [PurchaseWhereInput], { nullable: true })
  OR: PurchaseWhereInput[]
  @Field(() => [PurchaseWhereInput], { nullable: true })
  NOT: PurchaseWhereInput[]
}

@InputType()
export class PurchaseListRelationFilter {
  @Field(() => PurchaseWhereInput, { nullable: true })
  every: PurchaseWhereInput
  @Field(() => PurchaseWhereInput, { nullable: true })
  some: PurchaseWhereInput
  @Field(() => PurchaseWhereInput, { nullable: true })
  none: PurchaseWhereInput
}

@InputType()
export class PurchaseRelationFilter {
  @Field(() => PurchaseWhereInput, { nullable: true })
  is: PurchaseWhereInput
  @Field(() => PurchaseWhereInput, { nullable: true })
  isNot: PurchaseWhereInput
}
