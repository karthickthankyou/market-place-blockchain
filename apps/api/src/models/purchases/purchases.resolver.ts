import { Resolver, Query, Args } from '@nestjs/graphql'
import { PurchasesService } from './purchases.service'
import { Purchase } from './entities/purchase.entity'
import { FindManyPurchaseArgs, FindUniquePurchaseArgs } from './dto/find.args'

@Resolver(() => Purchase)
export class PurchasesResolver {
  constructor(private readonly purchasesService: PurchasesService) {}

  @Query(() => [Purchase], { name: 'purchases' })
  findAll(@Args() args: FindManyPurchaseArgs) {
    return this.purchasesService.findAll(args)
  }

  @Query(() => Purchase, { name: 'purchase' })
  findOne(@Args() args: FindUniquePurchaseArgs) {
    return this.purchasesService.findOne(args)
  }
}
