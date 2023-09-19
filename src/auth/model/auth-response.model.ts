import { ObjectType } from '@nestjs/graphql';
import { User } from 'src/users/models/user.model';

@ObjectType()
export class TokenResponse {
  access_token?: string;
  reflesh_token?: string;
}

@ObjectType()
export class LoginAuthResponse extends TokenResponse {
  user: User;
  access_token: string;
  reflesh_token: string;
}

@ObjectType()
export class CheckAuthResponse {
  auth: boolean;
}

@ObjectType()
export class AuthResponse {
  message: string;
}
