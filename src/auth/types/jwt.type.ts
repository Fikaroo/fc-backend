import { Role } from '@prisma/client';

export type JwtPayloadType = {
  sub: string;
  email: string;
  role: Role;
  accessToken?: string;
  iat?: number;
  exp?: number;
};
