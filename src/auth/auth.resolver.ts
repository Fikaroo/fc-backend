import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';

import { AuthService } from './auth.service';
import { AuthResponse, CheckAuthResponse } from './model/auth-response.model';
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
  @Mutation(() => User)
  async singin(
    @Args('loginUserInput') loginUserInput: LoginUserInput,
    @Context() ctx: any,
  ): Promise<User> {
    const { access_token, reflesh_token, user } = await this.authService.signIn(
      ctx.user,
    );

    ctx.req.res.cookie('accessToken', access_token, {
      maxAge: this.configService.get('ACCESS_TOKEN_MAX_AGE'),
      httpOnly: true,
      signed: true,
    });

    ctx.req.res.cookie('refleshToken', reflesh_token, {
      maxAge: this.configService.get('REFLESH_TOKEN_MAX_AGE'),
      httpOnly: true,
      signed: true,
    });

    return user;
  }

  @Public()
  @Mutation(() => User)
  async signup(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<User> {
    return await this.authService.singUp(createUserInput);
  }

  @UseGuards(RefleshJwtAuthGuard)
  @Query(() => CheckAuthResponse)
  async checkAuth(@CurrentUser() user: User): Promise<CheckAuthResponse> {
    if (!user || JSON.stringify(user) === '{}') {
      return { auth: false };
    }

    return { auth: true };
  }

  @Public()
  @UseGuards(RefleshJwtAuthGuard)
  @Mutation(() => AuthResponse)
  async reflesh(
    @CurrentUser() user: JwtPayloadType,
    @Context() ctx: any,
  ): Promise<AuthResponse> {
    try {
      const { access_token } = await this.authService.getAccessToken(user);
      ctx?.req?.res?.cookie('accessToken', access_token, {
        maxAge: this.configService.get('ACCESS_TOKEN_MAX_AGE'),
        httpOnly: true,
        signed: true,
      });
      return { message: 'Token successfully updated' };
    } catch (error) {
      return error;
    }
  }

  @Public()
  @Mutation(() => AuthResponse)
  async logout(@Context() ctx: any): Promise<AuthResponse> {
    try {
      ctx?.req?.res?.clearCookie('accessToken');
      ctx?.req?.res?.clearCookie('refleshToken');
      return { message: 'You are successfully logged out' };
    } catch (error) {
      return error;
    }
  }
}
