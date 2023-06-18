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
import axios from 'axios';
import { Cache } from 'cache-manager';

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
      verifyCode += Number(Math.random() * 10).toFixed(0);
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
    try {
      const res = await axios.post(
        this.configService.get('NCP_URI'),
        body,
        options,
      );
      console.log(res);
    } catch (error) {
      console.log(error.response.data);
      throw new InternalServerErrorException('서버 에러');
    }
    await this.cacheManager.set(phoneNumber, verifyCode, 180000);
  }

  async checkSMS({ phoneNumber, verifyCode }) {
    const cacheVerifyNum = await this.cacheManager.get(phoneNumber);
    if (!cacheVerifyNum) {
      throw new Error('인증 번호가 만료되었습니다');
    } else if (cacheVerifyNum === verifyCode) {
      return true;
    } else {
      throw new UnauthorizedException('인증 번호가 일치하지 않습니다');
    }
  }

  // async login() {}
  // async signUp(
  //   userData: CreateUserDto,
  // ): Promise<{ createdUser: User; message: string }> {
  //   try {
  //     const values = Object.values(userData);
  //     if (values.length < 4) {
  //       throw new NotFoundException('정보를 전체 다 입력해주세요');
  //     } else {
  //       const hashedUserData = await this.transformPassword(userData.password);
  //       const accessToken = await this.jwtService.sign(userData.userId, {
  //         expiresIn: '7d',
  //       });
  //       const createdUser = await this.userRepository.createUser({
  //         ...userData,
  //         password: hashedUserData,
  //       });
  //       return { createdUser, message: '회원가입이 완료되었습니다.' };
  //     }
  //   } catch (error) {
  //     if (error.code === 'P2002') {
  //       throw new ConflictException('이미 존재하는 아이디 입니다.');
  //     }
  //     throw new InternalServerErrorException(error.message);
  //   }
  // }
  async signUp(userData) {
    const hashedPassword = await this.transform(userData.password);
    const { userId, name, phone } = await this.userRepository.createUser({
      ...userData,
      password: hashedPassword,
    });
    return { userId, name, phone };
  }

  async loginUser(userData) {
    try {
      const user = await this.userRepository.getUserByUserId(userData.userId);
      const checkPassword = await this.compare(
        userData.password,
        user.password,
      );
      if (!checkPassword) {
        throw new UnauthorizedException('비밀번호 불일치');
      }
      const cookieWithAccessToken = await this.getCookieWithAccessToken(
        userData.userId,
      );
      const cookieWithRefreshToken = await this.getCookieWithRefreshToken(
        userData.userId,
      );
      await this.userRepository.loginUser({
        ...userData,
        refreshToken: cookieWithRefreshToken.refreshToken,
      });
      return { cookieWithAccessToken, cookieWithRefreshToken };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async getCookieWithAccessToken(userId) {
    const accessToken = this.jwtService.sign(
      { userId },
      {
        expiresIn: 100000,
      },
    );

    return {
      accessToken,
      path: '/',
      // domain: 'http://localhost:3001',
      httpOnly: true,
      maxAge: 100000,
    };
  }

  getCookieWithRefreshToken(userId) {
    const refreshToken = this.jwtService.sign(
      { userId },
      {
        secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET_KEY'),
        expiresIn: 604800,
      },
    );
    return {
      refreshToken,
      path: '/',
      // domain: 'http://localhost:3001',
      httpOnly: true,
      maxAge: 604800 * 1000,
    };
  }

  removeCookieWithRefreshToken() {
    return {
      accessOption: {
        path: '/',
        httpOnly: true,
        maxAge: 0,
      },
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
      return verified;
    } catch (error) {
      // throw new Error(error.message);
    }
  }

  async renewAccessToken(refreshToken, userId) {
    const user = await this.userRepository.getUserByUserId(userId);
    const res = await this.getUserIfRefreshTokenMatches(
      refreshToken,
      user.accounts.refreshToken,
    );
    if (res) {
      return this.getCookieWithAccessToken(user.userId);
    }
  }

  // async setCurrentRefreshToken(refreshToken: string, id: number) {
  //   const currentHashedRefreshToken = await bcrypt.hash(refreshToken, 10);
  //   await this.userRepository.updateRefreshToken(id, currentHashedRefreshToken);
  // }
  async getUserIfRefreshTokenMatches(refreshToken, userId) {
    const user = await this.userRepository.getUserByUserId(userId);
    console.log(user.accounts.refreshToken);
    console.log(refreshToken);
    if (refreshToken === user.accounts.refreshToken) {
      return user;
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
