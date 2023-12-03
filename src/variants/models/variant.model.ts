import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class Variant {
  @Field(() => ID)
  id: string;
  name: string;
  @Field(() => ID)
  unitId: string;
  createdAt: Date;
  updatedAt: Date;
}
