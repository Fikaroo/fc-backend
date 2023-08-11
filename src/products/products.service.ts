import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Product } from './models/product.model';
import { UpdateProductInput } from './dto/update-product.input';
import { AddProductInput } from './dto/add-product.input';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Product[]> {
    return await this.prisma.product.findMany();
  }

  async findOne(id: string): Promise<Product> {
    return await this.prisma.product.findUnique({ where: { id } });
  }

  async create(data: AddProductInput): Promise<Product> {
    return await this.prisma.product.create({
      data: data,
    });
  }

  async update(
    id: string,
    updateProductInput: UpdateProductInput,
  ): Promise<Product> {
    return await this.prisma.product.update({
      where: { id },
      data: updateProductInput,
    });
  }

  async remove(id: string) {
    return await this.prisma.product.delete({ where: { id } });
  }
}
