import { ObjectType } from '@nestjs/graphql'
import { Product as ProductType } from '@prisma/client'
import { RestrictProperties } from 'src/common/dtos/common.input'

@ObjectType()
export class Product implements RestrictProperties<Product, ProductType> {
  id: number
  name: string
  description: string
  images: string[]
  // Todo fill all properties. To make it nullable add below.
  // @Field(() => String, { nullable: true })
}
