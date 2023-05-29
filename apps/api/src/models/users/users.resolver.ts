import { Resolver, Query, Args, ResolveField, Parent } from '@nestjs/graphql'
import { UsersService } from './users.service'
import { User } from './entities/user.entity'
import { FindManyUserArgs, FindUniqueUserArgs } from './dto/find.args'
import { PrismaService } from 'src/common/prisma/prisma.service'
import { Purchase } from '../purchases/entities/purchase.entity'

@Resolver(() => User)
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly prisma: PrismaService,
  ) {}

  @Query(() => [User], { name: 'users' })
  findAll(@Args() args: FindManyUserArgs) {
    return this.usersService.findAll(args)
  }

  @Query(() => User, { name: 'user' })
  findOne(@Args() args: FindUniqueUserArgs) {
    return this.usersService.findOne(args)
  }

  @ResolveField(() => [Purchase])
  sold(@Parent() parent: User) {
    return this.prisma.purchase.findMany({ where: { sellerId: parent.wallet } })
  }

  @ResolveField(() => [Purchase])
  purchased(@Parent() parent: User) {
    return this.prisma.purchase.findMany({ where: { sellerId: parent.wallet } })
  }
}
