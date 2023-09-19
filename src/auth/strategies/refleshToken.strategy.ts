import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtPayloadType } from '../types/jwt.type';

@Injectable()
export class RefleshJwtStrategy extends PassportStrategy(
  Strategy,
  'jwt-reflesh',
) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken,
      secretOrKey: configService.get('REFLESH_TOKEN_SECRET'),
      ignoreExpiration: false,
    });
  }

  async validate(payload: JwtPayloadType): Promise<JwtPayloadType> {
    return payload;
  }
}
