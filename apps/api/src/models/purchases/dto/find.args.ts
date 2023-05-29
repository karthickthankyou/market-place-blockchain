import { ArgsType, Field, registerEnumType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import { PurchaseOrderByWithRelationInput } from './orderBy.args'
import { PurchaseWhereInput, PurchaseWhereUniqueInput } from './where.args'
import { RestrictProperties } from 'src/common/dtos/common.input'

registerEnumType(Prisma.PurchaseScalarFieldEnum, {
  name: 'PurchaseScalarFieldEnum',
})

@ArgsType()
export class FindManyPurchaseArgs
  implements
    RestrictProperties<
      FindManyPurchaseArgs,
      Omit<Prisma.PurchaseFindManyArgs, 'include' | 'select'>
    >
{
  @Field(() => PurchaseWhereInput, { nullable: true })
  where: PurchaseWhereInput
  @Field(() => [PurchaseOrderByWithRelationInput], { nullable: true })
  orderBy: PurchaseOrderByWithRelationInput[]
  @Field(() => PurchaseWhereUniqueInput, { nullable: true })
  cursor: PurchaseWhereUniqueInput
  @Field(() => Number, { nullable: true })
  take: number
  @Field(() => Number, { nullable: true })
  skip: number
  @Field(() => [Prisma.PurchaseScalarFieldEnum], { nullable: true })
  distinct: Prisma.PurchaseScalarFieldEnum[]
}

@ArgsType()
export class FindUniquePurchaseArgs {
  @Field({ nullable: true })
  where: PurchaseWhereUniqueInput
}
