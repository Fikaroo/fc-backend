import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { CaslAbilityFactory } from '../casl-ability.factory/casl-ability.factory';
import { Reflector } from '@nestjs/core';
import { CHECK_ABILITY, RequireRule } from '../decorators/casl.decorator';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ForbiddenError } from '@casl/ability';

@Injectable()
export class CaslAbilityGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private caslAbilityFactory: CaslAbilityFactory,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride('isPublic', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const rules =
      this.reflector.get<RequireRule[]>(CHECK_ABILITY, context.getHandler()) ||
      [];

    const ctx = GqlExecutionContext.create(context);
    const payload = ctx.getContext().req.user;
    const ability = this.caslAbilityFactory.defineAbility(payload);
    try {
      rules.forEach((rule) =>
        ForbiddenError.from(ability).throwUnlessCan(rule.action, rule.subject),
      );
      return true;
    } catch (error) {
      throw new ForbiddenException(error.message);
    }
  }
}
