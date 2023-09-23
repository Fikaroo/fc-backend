import { Resolver, Query, Mutation, Args, Context, ID } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './models/user.model';
import { UpdateUserInput } from './dto/update-user.input';
import {
  Action,
  CaslAbilityFactory,
} from 'src/casl/casl-ability.factory/casl-ability.factory';

@Resolver(() => User)
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly caslAbility: CaslAbilityFactory,
  ) {}

  @Query(() => User, { name: 'user' })
  async findOne(
    @Args({ name: 'id', type: () => ID }) id: string,
    @Context() ctx: any,
  ): Promise<User> {
    const user = ctx.req.user;
    const action = Action.Read;
    const subject = await this.usersService.findUserById(id);

    this.caslAbility.checkAbility({ action, subject }, user);
    return subject;
  }

  @Mutation(() => User)
  async updateUser(
    @Args({ name: 'id', type: () => ID }) id: string,
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
    @Context() ctx: any,
  ) {
    const user = ctx.req.user;
    const action = Action.Update;
    const subject = await this.usersService.findUserById(id);

    this.caslAbility.checkAbility({ action, subject }, user);
    return this.usersService.update(id, updateUserInput);
  }

  @Mutation(() => User)
  removeUser(@Args({ name: 'id', type: () => ID }) id: string) {
    return this.usersService.remove(id);
  }
}
