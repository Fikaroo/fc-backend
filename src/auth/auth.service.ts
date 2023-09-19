import { Injectable, NotAcceptableException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { User } from '../users/models/user.model';
import { CreateUserInput } from 'src/users/dto/create-user.input';
import * as bcrypt from 'bcrypt';
import { JwtPayloadType } from './types/jwt.type';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<User> {
    const user = await this.usersService.findUserByEmail(email);
    if (!user) {
      throw new NotAcceptableException('Could not find the user');
    }
    const passwordValid = await bcrypt.compare(pass, user?.password);

    if (user && passwordValid) {
      return { ...user, password: null };
    }

    return null;
  }

  async signIn(user: User) {
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    } as JwtPayloadType;

    return {
      ...(await this.createTokens(payload)),
      user: { ...user, password: null },
    };
  }

  async singUp(createUserInput: CreateUserInput) {
    const email = createUserInput.email.toLowerCase();
    const user = await this.usersService.findUserByEmail(email);
    if (user) {
      throw new Error('User already exists!');
    }
    const salt = await bcrypt.genSalt();
    const password = await bcrypt.hash(createUserInput.password, salt);
    const newUser = await this.usersService.create({
      ...createUserInput,
      email,
      password,
    });

    return { ...newUser, password: null };
  }

  async getAccessToken({ sub, email, role }: JwtPayloadType) {
    const payload = {
      sub,
      email,
      role,
    } as JwtPayloadType;

    const { access_token } = await this.createTokens(payload);
    return { access_token };
  }

  async createTokens(payload: JwtPayloadType) {
    const accessToken = await this.jwtService.signAsync(
      { ...payload },
      {
        expiresIn: this.configService.get('ACCESS_TOKEN_EXPIRES_IN'),
        secret: this.configService.get('ACCESS_TOKEN_SECRET'),
      },
    );
    const refleshToken = await this.jwtService.signAsync(
      { ...payload, accessToken },
      {
        expiresIn: this.configService.get('REFLESH_TOKEN_EXPIRES_IN'),
        secret: this.configService.get('REFLESH_TOKEN_SECRET'),
      },
    );

    return { access_token: accessToken, reflesh_token: refleshToken };
  }
}
