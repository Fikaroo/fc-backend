import { InputType, Field, PickType, ID } from '@nestjs/graphql';
import { Variant } from '../models/variant.model';

@InputType()
export class CreateVariantInput extends PickType(Variant, ['name', 'unitId']) {
  name: string;
  @Field(() => ID)
  unitId: string;
}
