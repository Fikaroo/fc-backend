import {
  InferSubjects,
  AbilityBuilder,
  ExtractSubjectType,
  createMongoAbility,
  MongoAbility,
  CreateAbility,
  ForbiddenError,
} from '@casl/ability';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { User } from '../../users/models/user.model';
import { JwtPayloadType } from '../../auth/types/jwt.type';

export enum Action {
  Manage = 'manage',
  Create = 'create',
  Read = 'read',
  Update = 'update',
  Delete = 'delete',
}

export type Subjects = InferSubjects<typeof User> | 'all';

export interface RequireRule {
  action: Action;
  subject: Subjects;
}

export type AppAbility = MongoAbility<[Action, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
  defineAbility({ role, sub }: JwtPayloadType) {
    const { can, cannot, build } = new AbilityBuilder(
      createMongoAbility as CreateAbility<AppAbility>,
    );
    if (role === 'SUPER_ADMIN' || role === 'ADMIN') {
      can(Action.Manage, 'all');
    }
    if (role === 'CUSTOMER') {
      can(Action.Read, 'all');
      cannot(Action.Read, User, { id: { $ne: sub } }).because(
        "Insufficient Permissions – You do not have the necessary rights to perform this action on another user's data.",
      );
      cannot(Action.Manage, User, { id: { $ne: sub } }).because(
        'Access Restricted – You can only modify your own data unless authorized otherwise.',
      );
    }

    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }

  checkAbility({ action, subject }: RequireRule, user: JwtPayloadType) {
    const ability = this.defineAbility(user);
    try {
      ForbiddenError.from(ability).throwUnlessCan(action, subject);
      return true;
    } catch (error) {
      if (error instanceof ForbiddenError)
        throw new ForbiddenException(error.message);
    }
  }
}
