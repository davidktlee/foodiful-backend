import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserRepository } from 'src/user/user.repository';
import { AuthService } from '../auth.service';

import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private userRepository: UserRepository,
    private authService: AuthService,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('JWT_ACCESS_TOKEN_SECRET_KEY'),
      ignoreExpiration: false,
      passReqToCallback: true,
      // module에 등록한 secret 과 비교
      // secretOrKey: process.env.JWT_ACCESS_TOKEN_SECRET_KEY,
      // header에 bearer token 부분에서 jwt 토큰을 추출할 것이라는 명시
      // jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }
  // 위에서 토큰이 유효한지 체크가 되면 validate 메서드에서 payload에 있는 userId를 이용해 db에 검색,
  // 있다면 유저 객체를 반환
  // return 값은 @useGuard(jwt)를 이용한 모든 요청의 req 객체에 들어감
  async validate(payload, req) {
    return {
      email: req.email,
      name: req.name,
      phone: req.phone,
      token: payload.headers.authorization.replace('Bearer ', ''),
      role: req.role,
      id: req.id,
    };
  }
}
