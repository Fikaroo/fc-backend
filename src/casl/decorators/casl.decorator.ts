import { SetMetadata } from '@nestjs/common';
import { Action, Subjects } from '../casl-ability.factory/casl-ability.factory';
import { User } from 'src/users/models/user.model';

export interface RequireRule {
  action: Action;
  subject: Subjects;
}

export const CHECK_ABILITY = 'check_ability';

export const CheckAbilities = (...requirements: RequireRule[]) =>
  SetMetadata(CHECK_ABILITY, requirements);

export class ReadUserAbility implements RequireRule {
  action = Action.Read;
  subject = User;
}

export class UpdateUserAbility implements RequireRule {
  action = Action.Update;
  subject = User;
}

export class DeleteUserAbility implements RequireRule {
  action = Action.Delete;
  subject = User;
}
