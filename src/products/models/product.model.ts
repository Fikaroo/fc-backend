import { ObjectType, Field, ID, Int, Float } from '@nestjs/graphql';

@ObjectType('Product')
export class Product {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => Float)
  price: number;

  @Field(() => Int, { nullable: true })
  availableQuantity: number;

  @Field(() => ID)
  categoryId: string;

  @Field(() => ID, { nullable: true })
  subcategoryId?: string;

  @Field(() => ID)
  brandId: string;

  @Field(() => Int, { defaultValue: 0 })
  avgRating: number;
}

//! ToDo add images, review and orderitem model
