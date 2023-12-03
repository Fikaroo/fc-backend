import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { VariantsService } from './variants.service';
import { Variant } from './models/variant.model';
import { CreateVariantInput } from './dto/create-variant.input';
import { UpdateVariantInput } from './dto/update-variant.input';

@Resolver(() => Variant)
export class VariantsResolver {
  constructor(private readonly variantsService: VariantsService) {}

  @Mutation(() => Variant)
  createVariant(
    @Args('createVariantInput') createVariantInput: CreateVariantInput,
  ) {
    return this.variantsService.create(createVariantInput);
  }

  @Query(() => [Variant], { name: 'variants' })
  findAll() {
    return this.variantsService.findAll();
  }

  @Query(() => Variant, { name: 'variant' })
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.variantsService.findOne(id);
  }

  @Mutation(() => Variant)
  updateVariant(
    @Args('id', { type: () => ID }) id: string,
    @Args('updateVariantInput') updateVariantInput: UpdateVariantInput,
  ) {
    return this.variantsService.update(id, updateVariantInput);
  }

  @Mutation(() => Variant)
  removeVariant(@Args('id', { type: () => ID }) id: string) {
    return this.variantsService.remove(id);
  }
}
