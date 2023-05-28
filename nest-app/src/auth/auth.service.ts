import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';
import { validate } from 'class-validator';
import { UserRepository } from '../user/user.repository';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(private userRepository: UserRepository) {}

  // async login() {}
  async signUp(
    userData: CreateUserDto,
  ): Promise<{ createdUser: User; message: string }> {
    try {
      const values = Object.values(userData);
      if (values.length !== Object.keys(userData).length) {
        throw new NotFoundException('정보를 입력해주세요');
      } else {
        const hashedUserData = await this.transformPassword(userData.password);
        const createdUser = await this.userRepository.createUser({
          ...userData,
          password: hashedUserData,
        });
        return { createdUser, message: '회원가입이 완료되었습니다.' };
      }
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException('이미 존재하는 아이디 입니다.');
      }
      throw new InternalServerErrorException(error.message);
    }
  }

  async transformPassword(password): Promise<User['password']> {
    password = await bcrypt.hash(password, 10);
    return password;
  }
}
