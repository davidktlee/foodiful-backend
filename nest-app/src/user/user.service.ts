import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';
import { UserRepository } from './user.repository';
import { UpdateUserDto } from './dto/update-user.dto';
import { S3 } from '@aws-sdk/client-s3';
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

  async deleteUser(id: number): Promise<{ user: User; message: string }> {
    try {
      const user = await this.userRepository.getUserById(id);
      if (!user) throw new NotFoundException('삭제하실 회원이 없습니다');
      else {
        await this.deleteUserProfile(user.profile);
        await this.userRepository.deleteUser(id);
        return { user, message: '회원 삭제가 완료되었습니다.' };
      }
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async createUser(
    userData,
    file,
  ): Promise<{ createdUser: User; message: string }> {
    try {
      const { filePath, key } = await this.uploadUserProfile(file);
      const hashedUserData = await this.transformPassword(userData.password);
      const createdUser = await this.userRepository.createUser({
        ...userData,
        profile: filePath,
        password: hashedUserData,
      });
      return { createdUser, message: '회원이 추가되었습니다.' };
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException(
          '이미 존재하는 userId 이거나 이미 존재하는 휴대폰 번호입니다.',
        );
      } else {
        throw new InternalServerErrorException(error.message);
      }
    }
  }

  async uploadUserProfile(file: Express.MulterS3.File) {
    if (!file) {
      throw new BadRequestException('파일을 업로드해주세요.');
    }
    return { filePath: file.location, key: file.key };
  }

  async deleteUserProfile(key: string) {
    const s3 = new S3({
      region: this.config.get('AWS_BUCKET_REGION'),
      credentials: {
        accessKeyId: this.config.get('AWS_ACCESS_KEY_ID'),
        secretAccessKey: this.config.get('AWS_SECRET_ACCESS_KEY'),
      },
    });
    const startKey = key.indexOf('user');
    console.log(startKey);
    const res = await s3.deleteObject({
      Bucket: this.config.get('AWS_BUCKET_NAME'),
      Key: key.slice(startKey, key.length),
    });
    return res;
  }

  async transformPassword(password): Promise<User['password']> {
    password = await bcrypt.hash(password, 10);
    return password;
  }

  async updateUser(
    id: number,
    updateUserData: UpdateUserDto,
    file,
  ): Promise<{ updatedUser; message: string }> {
    try {
      const user = await this.userRepository.getUserById(id);
      if (!user)
        throw new NotFoundException('수정하실 회원이 존재하지 않습니다');
      else {
        if (user.profile !== updateUserData.profile) {
          await this.deleteUserProfile(user.profile);
          const updatedUser = await this.userRepository.updateUser(id, {
            ...updateUserData,
            profile: file,
          });
          return { updatedUser, message: '수정이 완료되었습니다.' };
        }
      }
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
