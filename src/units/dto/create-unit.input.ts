import { InputType, PickType } from '@nestjs/graphql';
import { Unit } from '../models/unit.model';

@InputType()
export class CreateUnitInput extends PickType(Unit, ['name']) {
  name: string;
  value: string;
}
