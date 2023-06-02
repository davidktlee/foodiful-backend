import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';
import { UserRepository } from '../user/user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

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
    const hashedPassword = await this.transformPassword(userData.password);
    const { userId, name, phone } = await this.userRepository.createUser({
      ...userData,
      password: hashedPassword,
    });
    return { userId, name, phone };
  }

  async createAccessToken(userId) {
    const accessToken = this.jwtService.sign(
      { userId },
      {
        expiresIn: 10000,
      },
    );

    return {
      accessToken,
      path: '/',
      httpOnly: true,
      maxAge: 10000,
    };
  }

  async loginUser(userData) {
    try {
      const user = await this.userRepository.getUserByUserId(userData.userId);
      const checkPassword = await bcrypt.compare(
        userData.password,
        user.password,
      );
      if (!checkPassword) {
        throw new UnauthorizedException('비밀번호 불일치');
      }
      const accessToken = this.createAccessToken(userData.userId);
      return accessToken;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async transformPassword(password): Promise<User['password']> {
    password = await bcrypt.hash(password, 10);
    return password;
  }
}
