import { Module } from '@nestjs/common';
import { VariantsService } from './variants.service';
import { VariantsResolver } from './variants.resolver';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [VariantsResolver, VariantsService, PrismaService],
})
export class VariantsModule {}
