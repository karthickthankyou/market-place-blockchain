import { ObjectType } from '@nestjs/graphql'
import { User as UserType } from '@prisma/client'
import { RestrictProperties } from 'src/common/dtos/common.input'

@ObjectType()
export class User implements RestrictProperties<User, UserType> {
  wallet: string
  name: string
  contact: string
  // Todo fill all properties. To make it nullable add below.
  // @Field(() => String, { nullable: true })
}
