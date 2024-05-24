import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserRepository } from 'src/user/user.repository';
import { AuthService } from '../auth.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(
    private userRepository: UserRepository,
    private authService: AuthService,
    private configService: ConfigService,
  ) {
    super({
      // module에 등록한 secret 과 비교
      secretOrKey: configService.get('JWT_ACCESS_TOKEN_SECRET_KEY'),
      // header에 bearer token 부분에서 jwt 토큰을 추출할 것이라는 명시
      jwtFromRequest: ExtractJwt.fromExtractors([(req) => req.body]),
      passReqToCallback: true,
    });
  }
  // 위에서 토큰이 유효한지 체크가 되면 validate 메서드에서 payload에 있는 userId를 이용해 db에 검색,
  // 있다면 유저 객체를 반환
  // return 값은 @useGuard(local)를 이용한 모든 요청의 req 객체에 들어감
  async validate(payload) {
    const { email, password } = payload;
    const user = await this.userRepository.getUserByUserEmail(email);
    const checkPassword = await this.authService.compare(
      password,
      user.password,
    );

    if (!user) {
      throw new UnauthorizedException('유저 정보가 없습니다');
    } else if (!checkPassword) {
      throw new UnauthorizedException('비밀번호가 일치하지 않습니다.');
    }

    return user;
  }
}
