import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from '../auth/dto/create-user.dto';

import { User } from '@prisma/client';
import { UserRepository } from './user.repository';
import { UpdateUserDto } from '../auth/dto/update-user.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
    private readonly config: ConfigService,
  ) {}

  /**
   *
   * @Todo: auth 기능 만든 후 getUsers, getUserById 기능은 관리자 일때만 가능하도록 만들기
   */
  async getUsers(): Promise<{ users: User[] }> {
    try {
      const users = await this.userRepository.getUser();
      if (users.length === 0) throw new ForbiddenException('회원이 없습니다');
      return { users: users };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
  async getUserById(id: number): Promise<User> {
    try {
      const user = await this.userRepository.getUserById(id);
      if (!user) throw new NotFoundException('찾으시는 회원이 없습니다');
      return user;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async getUserByUserId(userId: string): Promise<User> {
    try {
      const user = await this.userRepository.getUserByUserId(userId);
      if (!user) throw new NotFoundException('찾으시는 회원이 없습니다');
      return user;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async deleteUser(id: number): Promise<{ user: User; message: string }> {
    try {
      const user = await this.userRepository.getUserById(id);
      if (!user) throw new NotFoundException('삭제하실 회원이 없습니다');
      else {
        await this.userRepository.deleteUser(id);
        return { user, message: '회원 삭제가 완료되었습니다.' };
      }
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // async createUser(userData): Promise<{ createdUser: User; message: string }> {
  //   try {
  //     // // const hashedUserData = await this.transformPassword(userData.password);
  //     // const createdUser = await this.userRepository.createUser({
  //     //   ...userData,
  //     //   password: hashedUserData,
  //     // });
  //     return { createdUser, message: '회원이 추가되었습니다.' };
  //   } catch (error) {
  //     if (error.code === 'P2002') {
  //       throw new ConflictException(
  //         '이미 존재하는 userId 이거나 이미 존재하는 휴대폰 번호입니다.',
  //       );
  //     } else {
  //       throw new InternalServerErrorException(error.message);
  //     }
  //   }
  // }

  // async uploadUserProfile(file: Express.MulterS3.File) {
  //   if (!file) {
  //     throw new BadRequestException('파일을 업로드해주세요.');
  //   }
  //   return file.location;
  // }

  // async deleteUserProfile(key: string) {
  //   const s3 = new S3({
  //     region: this.config.get('AWS_BUCKET_REGION'),
  //     credentials: {
  //       accessKeyId: this.config.get('AWS_ACCESS_KEY_ID'),
  //       secretAccessKey: this.config.get('AWS_SECRET_ACCESS_KEY'),
  //     },
  //   });
  //   const startKey = key.indexOf('user');
  //   await s3.deleteObject({
  //     Bucket: this.config.get('AWS_BUCKET_NAME'),
  //     Key: key.slice(startKey, key.length),
  //   });
  // }

  async updateUser(
    id: number,
    updateUserData: UpdateUserDto,
  ): Promise<{ updatedUser; message: string }> {
    try {
      const user = await this.userRepository.getUserById(id);
      if (!user)
        throw new NotFoundException('수정하실 회원이 존재하지 않습니다');
      else {
        // user와 updateUserData 비교 로직
        for (const key in user) {
          if (
            !!user[key] &&
            !!updateUserData[key] &&
            user[key] !== updateUserData[key]
          ) {
            user[key] = updateUserData[key];
          }
        }

        const updatedUser = await this.userRepository.updateUser(id, {
          ...user,
        });
        return { updatedUser, message: '수정이 완료되었습니다.' };
      }
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
