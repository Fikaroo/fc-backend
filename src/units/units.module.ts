import { Module } from '@nestjs/common';
import { UnitsService } from './units.service';
import { UnitsResolver } from './units.resolver';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [UnitsResolver, UnitsService, PrismaService],
})
export class UnitsModule {}
