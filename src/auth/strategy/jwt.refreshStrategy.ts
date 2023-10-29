import {
  ForbiddenException,
  HttpException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { validate } from 'class-validator';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh-token',
) {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request) => {
          return request?.cookies?.refresh;
        },
      ]),
      secretOrKey: configService.get('JWT_REFRESH_TOKEN_SECRET_KEY'),
      // ignoreExpiration: false,
      passReqToCallback: true,
    });
  }
  async validate(payload, req) {
    const refreshToken = payload?.cookies?.refresh;
    if (!refreshToken) {
      throw new ForbiddenException('리프레시 토큰 만료');
    }
    const {
      refreshUser,
      refreshToken: newRefreshToken,
      ...refreshOption
    } = await this.authService.getUserIfRefreshTokenMatches(
      req.email,
      refreshToken,
    );

    return {
      refreshUser,
      refreshToken: newRefreshToken,
      ...refreshOption,
    };
  }
}
