import { CreateUnitInput } from './create-unit.input';
import { InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateUnitInput extends PartialType(CreateUnitInput) {}
