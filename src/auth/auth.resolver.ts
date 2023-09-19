import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';

import { AuthService } from './auth.service';
import {
  CheckAuthResponse,
  LoginAuthResponse,
  TokenResponse,
} from './model/auth-response.model';
import { LoginUserInput } from './dto/login-user.input';
import { GqlAuthGuard } from './guards/gql-auth.guard';
import { CreateUserInput } from 'src/users/dto/create-user.input';
import { Public } from './decorators/public.decorator';
import { RefleshJwtAuthGuard } from './guards/reflesh-jwt-auth.guard';
import { CurrentUser } from './decorators/currentUser.decorator';
import { JwtPayloadType } from './types/jwt.type';
import { User } from '../users/models/user.model';
import { ConfigService } from '@nestjs/config';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @Public()
  @UseGuards(GqlAuthGuard)
  @Mutation(() => LoginAuthResponse)
  async singin(
    @Args('loginUserInput') loginUserInput: LoginUserInput,
    @Context() ctx: any,
  ): Promise<LoginAuthResponse> {
    return await this.authService.signIn(ctx.user);
  }

  @Public()
  @Mutation(() => User)
  async signup(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<User> {
    return await this.authService.singUp(createUserInput);
  }

  @Public()
  @UseGuards(RefleshJwtAuthGuard)
  @Mutation(() => TokenResponse)
  async reflesh(@CurrentUser() user: JwtPayloadType): Promise<TokenResponse> {
    try {
      const { access_token } = await this.authService.getAccessToken(user);
      return { access_token };
    } catch (error) {
      return error;
    }
  }

  @UseGuards(RefleshJwtAuthGuard)
  @Query(() => CheckAuthResponse)
  async checkAuth(@CurrentUser() user: User): Promise<CheckAuthResponse> {
    if (!user || JSON.stringify(user) === '{}') {
      return { auth: false };
    }
    return { auth: true };
  }

  // @Public()
  // @Mutation(() => AuthResponse)
  // async logout(@Context() ctx: any): Promise<AuthResponse> {
  //   try {
  //     ctx?.req?.res?.clearCookie('accessToken');
  //     ctx?.req?.res?.clearCookie('refleshToken');
  //     return { message: 'You are successfully logged out' };
  //   } catch (error) {
  //     return error;
  //   }
  // }
}
