import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserRepository } from 'src/user/user.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userRepository: UserRepository) {
    super({
      // module에 등록한 secret 과 비교
      secretOrKey: '시크릿키임',
      // header에 bearer token 부분에서 jwt 토큰을 추출할 것이라는 명시
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }
  // 위에서 토큰이 유효한지 체크가 되면 validate 메서드에서 payload에 있는 userId를 이용해 db에 검색,
  // 있다면 유저 객체를 반환
  // return 값은 @useGuard(AuthGuard())를 이용한 모든 요청의 req 객체에 들어감
  async validate(payload) {
    const { userId } = payload;
    const user = await this.userRepository.getUserByUserId(userId);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
