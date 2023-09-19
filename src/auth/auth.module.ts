import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { LocalStrategy } from './strategies/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { RefleshJwtStrategy } from './strategies/refleshToken.strategy';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [UsersModule, PassportModule, JwtModule.register({})],
  providers: [
    AuthResolver,
    AuthService,
    ConfigService,
    JwtService,
    LocalStrategy,
    JwtStrategy,
    RefleshJwtStrategy,
  ],
  exports: [AuthService, ConfigService, JwtService],
})
export class AuthModule {}
