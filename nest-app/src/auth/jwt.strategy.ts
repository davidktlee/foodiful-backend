import { Injectable } from '@nestjs/common';
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

  async validate(payload) {
    const { userName } = payload;
    const user = await this.userRepository.getUserById(userName);
  }
}
