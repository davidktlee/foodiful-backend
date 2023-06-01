import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';
import { UserRepository } from '../user/user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
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
    const accessToken = await this.jwtService.sign({ userId: userData.userId });
    return accessToken;
  }

  async loginUser(userData) {
    try {
      const user = await this.userRepository.getUserByUserId(userData.userId);
      if (!user) throw new NotFoundException('회원 정보가 없습니다');
      const comparedPassword = await bcrypt.compare(
        user.password,
        userData.password,
      );
    } catch (error) {}
  }

  async transformPassword(password): Promise<User['password']> {
    password = await bcrypt.hash(password, 10);
    return password;
  }
}
