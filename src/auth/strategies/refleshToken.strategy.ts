import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtPayloadType } from '../types/jwt.type';
import { Request } from 'express';

@Injectable()
export class RefleshJwtStrategy extends PassportStrategy(
  Strategy,
  'jwt-reflesh',
) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        RefleshJwtStrategy.extractTokenFromCookie,
      ]),
      secretOrKey: configService.get('REFLESH_TOKEN_SECRET'),
      ignoreExpiration: false,
    });
  }

  async validate(payload: JwtPayloadType): Promise<JwtPayloadType> {
    return payload;
  }

  private static extractTokenFromCookie(request: Request): string | undefined {
    let token = null;
    if (request && request.signedCookies) {
      token = request.signedCookies['refleshToken'];
    }
    return token;
  }
}
