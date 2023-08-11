import { InputType } from '@nestjs/graphql';

@InputType('UpdateProduct')
export class UpdateProductInput {
  name?: string;
  description?: string;
  price?: number;
  availableQuantity?: number;
  categoryId?: string;
  subcategoryId?: string;
  brandId?: string;
  avgRating?: number;
}
