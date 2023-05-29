import { Field, InputType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import { RestrictProperties, StringFilter } from 'src/common/dtos/common.input'
import { InventoryListRelationFilter } from 'src/models/inventories/dto/where.args'
import { PurchaseListRelationFilter } from 'src/models/purchases/dto/where.args'

@InputType()
export class UserWhereUniqueInput
  implements
    RestrictProperties<UserWhereUniqueInput, Prisma.UserWhereUniqueInput>
{
  @Field(() => StringFilter, { nullable: true })
  wallet: string
}

@InputType()
export class UserWhereInput
  implements RestrictProperties<UserWhereInput, Prisma.UserWhereInput>
{
  @Field(() => StringFilter, { nullable: true })
  wallet: StringFilter
  @Field(() => StringFilter, { nullable: true })
  name: StringFilter
  @Field(() => StringFilter, { nullable: true })
  contact: StringFilter
  @Field(() => InventoryListRelationFilter, { nullable: true })
  inventory: InventoryListRelationFilter
  @Field(() => PurchaseListRelationFilter, { nullable: true })
  sold: PurchaseListRelationFilter
  @Field(() => PurchaseListRelationFilter, { nullable: true })
  purchased: PurchaseListRelationFilter

  @Field(() => [UserWhereInput], { nullable: true })
  AND: UserWhereInput[]
  @Field(() => [UserWhereInput], { nullable: true })
  OR: UserWhereInput[]
  @Field(() => [UserWhereInput], { nullable: true })
  NOT: UserWhereInput[]
}

@InputType()
export class UserListRelationFilter {
  @Field(() => UserWhereInput, { nullable: true })
  every: UserWhereInput
  @Field(() => UserWhereInput, { nullable: true })
  some: UserWhereInput
  @Field(() => UserWhereInput, { nullable: true })
  none: UserWhereInput
}

@InputType()
export class UserRelationFilter {
  @Field(() => UserWhereInput, { nullable: true })
  is: UserWhereInput
  @Field(() => UserWhereInput, { nullable: true })
  isNot: UserWhereInput
}
