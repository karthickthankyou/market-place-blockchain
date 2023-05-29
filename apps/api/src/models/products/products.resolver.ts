import { Resolver, Query, Args, ResolveField, Parent } from '@nestjs/graphql'
import { ProductsService } from './products.service'
import { Product } from './entities/product.entity'
import { FindManyProductArgs, FindUniqueProductArgs } from './dto/find.args'
import { PrismaService } from 'src/common/prisma/prisma.service'
import { Inventory } from '../inventories/entities/inventory.entity'

@Resolver(() => Product)
export class ProductsResolver {
  constructor(
    private readonly productsService: ProductsService,
    private readonly prisma: PrismaService,
  ) {}

  @Query(() => [Product], { name: 'products' })
  findAll(@Args() args: FindManyProductArgs) {
    return this.productsService.findAll(args)
  }

  @Query(() => Product, { name: 'product' })
  findOne(@Args() args: FindUniqueProductArgs) {
    return this.productsService.findOne(args)
  }

  @ResolveField(() => [Inventory])
  inventory(@Parent() parent: Product) {
    return this.prisma.inventory.findMany({
      where: { productId: parent.id },
    })
  }
}
