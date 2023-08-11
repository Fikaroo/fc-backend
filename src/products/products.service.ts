import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateProduct } from './dto/create-product.input';
import { Product } from './models/product.model';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Product[]> {
    return await this.prisma.product.findMany();
  }

  async create(data: CreateProduct): Promise<Product> {
    return await this.prisma.product.create({
      data: data,
    });
  }
  // findOne(id: number) {
  //   return `This action returns a #${id} product`;
  // }

  // update(id: number, updateProductInput: UpdateProductInput) {
  //   return `This action updates a #${id} product`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} product`;
  // }
}
