import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Variant } from 'src/variants/models/variant.model';

@ObjectType()
export class Unit {
  @Field(() => ID)
  id: string;
  name: string;
  value: string;
  @Field(() => [Variant])
  variants: Variant[];
  createdAt: Date;
  updatedAt: Date;
}
