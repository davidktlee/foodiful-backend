import {
  CacheInterceptor,
  CACHE_MANAGER,
  ConflictException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
  UseInterceptors,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';
import { UserRepository } from '../user/user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import CryptoJS from 'crypto-js';
import { Cache } from 'cache-manager';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
@UseInterceptors(CacheInterceptor)
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
    private configService: ConfigService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  private makeSignature(): string {
    const space = ' ';
    const newLine = '\n';
    const method = 'POST';
    const timeStamp = Date.now().toString();
    const url = this.configService.get('NCP_URL');
    const secret = this.configService.get('NCP_SECRET_KEY');

    const hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, secret);

    hmac.update(method);
    hmac.update(space);
    hmac.update(url);
    hmac.update(newLine);
    hmac.update(timeStamp);
    hmac.update(newLine);
    hmac.update(this.configService.get('NCP_ACCESS_KEY'));
    const hash = hmac.finalize();
    const signature = hash.toString(CryptoJS.enc.Base64);
    return signature;
  }

  async sendSMS(phoneNumber: string): Promise<any> {
    await this.cacheManager.del(phoneNumber);
    let verifyCode = '';
    for (let i = 1; i < 7; i++) {
      verifyCode += Math.floor(Math.random() * 10);
    }

    const body = {
      type: 'SMS',
      contentType: 'COMM',
      from: this.configService.get('HOST_PHONE_NUMBER'),
      content: `인증번호 [${verifyCode}]를 입력 해주세요.`,
      messages: [
        {
          to: phoneNumber,
        },
      ],
    };
    const options = {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'x-ncp-iam-access-key': this.configService.get('NCP_ACCESS_KEY'),
        'x-ncp-apigw-timestamp': Date.now().toString(),
        'x-ncp-apigw-signature-v2': this.makeSignature(),
      },
    };
    // 실제 메시지 보내는 로직
    // try {
    //   const res = await axios.post(
    //     this.configService.get('NCP_URI'),
    //     body,
    //     options,
    //   );
    //   console.log(res);
    // } catch (error) {
    //   console.log(error);
    //   throw new InternalServerErrorException('서버 에러');
    // }
    console.log(verifyCode);
    await this.cacheManager.set(phoneNumber, verifyCode, 180000);
  }

  async checkSMS({ phoneNumber, verifyCode }) {
    const cacheVerifyNum = await this.cacheManager.get(phoneNumber);
    if (!cacheVerifyNum) {
      throw new UnauthorizedException('인증 번호가 만료되었습니다');
    } else if (Number(cacheVerifyNum) == verifyCode) {
      return true;
    } else {
      throw new UnauthorizedException('인증 번호가 일치하지 않습니다');
    }
  }

  async isPhoneNumberExist(phoneNumber: string) {
    const user = await this.userRepository.checkPhone(phoneNumber);
    if (user) throw new ConflictException('이미 존재하는 휴대폰 번호입니다.');
    return true;
  }

  async signUp(userData: CreateUserDto) {
    try {
      const hashedPassword = await this.transform(userData.password);
      const { email, name, phone } = await this.userRepository.createUser({
        ...userData,
        password: hashedPassword,
      });
      return { email, name, phone };
    } catch (error) {
      throw new ConflictException('이미 존재하는 유저입니다');
    }
  }

  async loginUser(userData: LoginUserDto) {
    try {
      const user = await this.userRepository.getUserByUserEmail(userData.email);
      const checkPassword = await this.compare(
        userData.password,
        user.password,
      );
      if (!checkPassword) {
        throw new UnauthorizedException('비밀번호 불일치');
      }
      const accessToken = await this.getAccessToken(
        userData.email,
        user.name,
        user.role,
        user.phone,
        user.id,
      );
      const cookieWithRefreshToken = await this.getCookieWithRefreshToken(
        userData.email,
      );
      await this.userRepository.loginUser({
        ...userData,
        refreshToken: cookieWithRefreshToken.refreshToken,
      });
      return { accessToken, cookieWithRefreshToken, user };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  getAccessToken(
    email: string,
    name: string,
    role: string,
    phone: string,
    id: number,
  ) {
    const accessToken = this.jwtService.sign(
      { email, name, role, phone, id },
      {
        expiresIn: '1h',
      },
    );
    return accessToken;
  }

  getCookieWithRefreshToken(email) {
    const refreshToken = this.jwtService.sign(
      { email },
      {
        secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET_KEY'),
        expiresIn: 604800,
      },
    );
    return {
      refreshToken,
      path: '/',
      httpOnly: true,
      // TODO: 나중에 배포하면 secure 옵션 추가해줘야 함.
      maxAge: 604800 * 1000,
    };
  }

  removeCookieWithRefreshToken() {
    return {
      refreshOption: {
        path: '/',
        httpOnly: true,
        maxAge: 0,
      },
    };
  }

  async validAccessToken(accessToken) {
    try {
      const verified = this.jwtService.verify(
        accessToken,
        this.configService.get('JWT_ACCESS_TOKEN_SECRET_KEY'),
      );
      if (verified) {
        return 'verified';
      }
      return verified;
    } catch (error) {
      throw new UnauthorizedException('토큰 검증 에러');
    }
  }

  async getUserIfRefreshTokenMatches(email, refreshToken) {
    const user = await this.userRepository.getUserByUserEmail(email);
    if (refreshToken === user.account.refreshToken) {
      const { refreshToken: newRefreshToken, ...refreshOption } =
        this.getCookieWithRefreshToken(user.email);
      const newAccessToken = this.getAccessToken(
        user.email,
        user.name,
        user.role,
        user.phone,
        user.id,
      );
      await this.userRepository.updateRefreshToken(user.email, newRefreshToken);

      return {
        refreshToken: newRefreshToken,
        refreshOption,
        refreshUser: {
          email: user.email,
          name: user.name,
          phone: user.phone,
          token: newAccessToken,
          role: user.role,
          id: user.id,
        },
      };
    } else {
      throw new NotFoundException('인증 에러');
    }
  }

  // async removeRefreshToken(id: number) {}

  async compare(willCompare, original) {
    return await bcrypt.compare(willCompare, original);
  }

  async transform(willHash): Promise<User['password']> {
    willHash = await bcrypt.hash(willHash, 10);
    return willHash;
  }
}
