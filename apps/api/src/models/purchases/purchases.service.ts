import { Injectable } from '@nestjs/common'
import { FindManyPurchaseArgs, FindUniquePurchaseArgs } from './dto/find.args'
import { PrismaService } from 'src/common/prisma/prisma.service'

@Injectable()
export class PurchasesService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(args: FindManyPurchaseArgs) {
    return this.prisma.purchase.findMany(args)
  }

  findOne(args: FindUniquePurchaseArgs) {
    return this.prisma.purchase.findUnique(args)
  }
}
