import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ProductsService } from './products.service';
import { Product } from './models/product.model';
import { CreateProduct } from './dto/create-product.input';

@Resolver(() => Product)
export class ProductsResolver {
  constructor(private readonly productsService: ProductsService) {}

  @Query(() => [Product])
  async products(): Promise<Product[]> {
    return await this.productsService.findAll();
  }

  @Mutation(() => Product)
  async addProduct(
    @Args('newProductData') newProductData: CreateProduct,
  ): Promise<Product> {
    return await this.productsService.create(newProductData);
  }
}
