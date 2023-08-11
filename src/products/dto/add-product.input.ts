import { InputType } from '@nestjs/graphql';
import { Product } from '../models/product.model';

@InputType('AddProduct')
export class AddProductInput extends Product {
  name: string;
  description?: string;
  price: number;
  availableQuantity: number;
  categoryId: string;
  subcategoryId?: string;
  brandId: string;
  avgRating: number;
}
