import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ProductsService } from './products.service';
import { Product } from './models/product.model';
import { AddProductInput } from './dto/add-product.input';
import { UpdateProductInput } from './dto/update-product.input';

@Resolver(() => Product)
export class ProductsResolver {
  constructor(private readonly productsService: ProductsService) {}

  @Query(() => [Product])
  async getAllProducts(): Promise<Product[]> {
    return await this.productsService.findAll();
  }

  @Query(() => Product)
  async getProduct(@Args('id') id: string): Promise<Product> {
    return await this.productsService.findOne(id);
  }

  @Mutation(() => Product)
  async addProduct(
    @Args('newProductData') newProductData: AddProductInput,
  ): Promise<Product> {
    return await this.productsService.create(newProductData);
  }

  @Mutation(() => Product)
  async updateProduct(
    @Args('id') id: string,
    @Args('updateProductData') updateProductData: UpdateProductInput,
  ): Promise<Product> {
    return await this.productsService.update(id, updateProductData);
  }

  @Query(() => [Product])
  async deleteProduct(@Args('id') id: string): Promise<Product> {
    return await this.productsService.remove(id);
  }
}
