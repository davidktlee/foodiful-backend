import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { CreateUserDto } from 'src/auth/dto/create-user.dto';
import { LoginUserDto } from 'src/auth/dto/login-user-.dto';
import { PrismaService } from 'src/prisma.service';
import { UpdateUserDto } from '../auth/dto/update-user.dto';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getUser(): Promise<User[]> {
    return this.prisma.user.findMany();
  }
  async getUserById(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
      include: { accounts: true },
    });
  }

  async getUserByUserId(userId: string): Promise<User> {
    return this.prisma.user.findUnique({
      where: { userId },
      // include: { product: true },
    });
  }

  async createUser(user: CreateUserDto): Promise<User> {
    const { userId, name, phone, password } = user;
    return await this.prisma.user.create({
      data: {
        userId,
        name,
        phone,
        password,
      },
    });
  }

  async loginUser(userData: LoginUserDto) /*Promise<User>*/ {
    const { userId, refreshToken } = userData;
    return await this.prisma.user.update({
      where: { userId },
      data: {
        accounts: {
          upsert: {
            create: {
              refreshToken,
            },
            update: {
              refreshToken,
            },
          },
        },
      },
      include: {
        accounts: true,
      },
    });
  }
  //   return await this.prisma.user.update({
  //     where: { userId },
  //     data: {
  //       accounts: {
  //         create: {
  //           accessToken,
  //           refreshToken,
  //         },
  //       },
  //     },
  //     include: {
  //       accounts: true,
  //     },
  //   });
  // }

  async deleteUser(id: number): Promise<User> {
    return this.prisma.user.delete({
      where: { id },
    });
  }

  async updateUser(id: number, user: UpdateUserDto): Promise<User> {
    return this.prisma.user.update({
      where: { id },
      data: { ...user },
    });
  }

  // async updateRefreshToken(id, refreshToken) {
  //   return this.prisma.user.update({
  //     where: { userId: id },
  //     data: {
  //       accounts: {
  //         accessToken: '',
  //         refreshToken,
  //       },
  //     },
  //     includes: {
  //       accounts: true,
  //     },
  //   });
  // }
}
