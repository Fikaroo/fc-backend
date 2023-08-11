import { Field, Float, ID, InputType, Int } from '@nestjs/graphql';
import { Product } from '../models/product.model';

@InputType('CreateProduct')
export class CreateProduct extends Product {
  @Field(() => String)
  name: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => Float)
  price: number;

  @Field(() => Int, { defaultValue: 0 })
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
