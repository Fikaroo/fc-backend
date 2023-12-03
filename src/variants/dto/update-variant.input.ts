import { CreateVariantInput } from './create-variant.input';
import { InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateVariantInput extends PartialType(CreateVariantInput) {}
