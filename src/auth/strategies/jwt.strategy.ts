import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { JwtPayloadType } from '../types/jwt.type';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        JwtStrategy.extractTokenFromCookie,
      ]),
      secretOrKey: configService.get('ACCESS_TOKEN_SECRET'),
      ignoreExpiration: false,
    });
  }

  async validate(payload: JwtPayloadType): Promise<JwtPayloadType> {
    return payload;
  }

  private static extractTokenFromCookie(request: Request): string | undefined {
    let token = null;
    if (request && request.signedCookies) {
      token = request.signedCookies['accessToken'];
    }
    return token;
  }
}
