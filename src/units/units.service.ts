import { Injectable } from '@nestjs/common';
import { CreateUnitInput } from './dto/create-unit.input';
import { UpdateUnitInput } from './dto/update-unit.input';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UnitsService {
  constructor(private readonly prisma: PrismaService) {}
  create(createUnitInput: CreateUnitInput) {
    return this.prisma.unit.create({
      data: createUnitInput,
      include: {
        variants: true,
      },
    });
  }

  findAll() {
    return this.prisma.unit.findMany({
      include: {
        variants: true,
      },
    });
  }

  findOne(id: string) {
    return this.prisma.unit.findUnique({
      where: { id },
      include: {
        variants: true,
      },
    });
  }

  update(id: string, updateUnitInput: UpdateUnitInput) {
    return this.prisma.unit.update({
      where: { id },
      data: updateUnitInput,
      include: {
        variants: true,
      },
    });
  }

  remove(id: string) {
    return this.prisma.unit.delete({
      where: { id },
      include: {
        variants: true,
      },
    });
  }
}
