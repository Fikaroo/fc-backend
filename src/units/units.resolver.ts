import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { UnitsService } from './units.service';
import { Unit } from './models/unit.model';
import { CreateUnitInput } from './dto/create-unit.input';
import { UpdateUnitInput } from './dto/update-unit.input';

@Resolver(() => Unit)
export class UnitsResolver {
  constructor(private readonly unitsService: UnitsService) {}

  @Mutation(() => Unit)
  createUnit(@Args('createUnitInput') createUnitInput: CreateUnitInput) {
    return this.unitsService.create(createUnitInput);
  }

  @Query(() => [Unit], { name: 'units' })
  findAll() {
    return this.unitsService.findAll();
  }

  @Query(() => Unit, { name: 'unit' })
  findOne(@Args({ name: 'id', type: () => ID }) id: string) {
    return this.unitsService.findOne(id);
  }

  @Mutation(() => Unit)
  updateUnit(
    @Args({ name: 'id', type: () => ID }) id: string,
    @Args('updateUnitInput') updateUnitInput: UpdateUnitInput,
  ) {
    return this.unitsService.update(id, updateUnitInput);
  }

  @Mutation(() => Unit)
  removeUnit(@Args({ name: 'id', type: () => ID }) id: string) {
    return this.unitsService.remove(id);
  }
}
