import { Injectable } from '@nestjs/common';
import { CreateVariantInput } from './dto/create-variant.input';
import { UpdateVariantInput } from './dto/update-variant.input';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class VariantsService {
  constructor(private readonly prisma: PrismaService) {}
  create(createVariantInput: CreateVariantInput) {
    return this.prisma.variant.create({
      data: createVariantInput,
    });
  }

  findAll() {
    return this.prisma.variant.findMany();
  }

  findOne(id: string) {
    return this.prisma.variant.findUnique({ where: { id } });
  }

  update(id: string, updateVariantInput: UpdateVariantInput) {
    return this.prisma.variant.update({
      where: { id },
      data: updateVariantInput,
    });
  }

  remove(id: string) {
    return this.prisma.variant.delete({ where: { id } });
  }
}
