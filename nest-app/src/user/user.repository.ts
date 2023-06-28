import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { iif } from 'rxjs';
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
      include: { account: true },
    });
  }

  async getUserByUserEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
      include: { account: true },
      // include: { product: true },
    });
  }

  async createUser(user: CreateUserDto): Promise<User> {
    const { email, name, phone, password } = user;
    return await this.prisma.user.create({
      data: {
        email,
        name,
        phone,
        password,
      },
    });
  }

  async loginUser(userData: LoginUserDto) /*Promise<User>*/ {
    const { email, refreshToken } = userData;
    return await this.prisma.user.update({
      where: { email },
      data: {
        account: {
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
        account: true,
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

  async softDeleteUser(id: number): Promise<User> {
    const deletedAt = Date.now().toString();
    return this.prisma.user.update({
      where: { id },
      data: { deletedAt },
    });
  }

  async updateUser(id: number, user: UpdateUserDto): Promise<User> {
    return this.prisma.user.update({
      where: { id },
      data: { ...user },
    });
  }

  async updateRefreshToken(
    email: string,
    newRefreshToken: LoginUserDto['refreshToken'],
  ) {
    return this.prisma.user.update({
      where: { email },
      data: {
        account: {
          upsert: {
            create: {
              refreshToken: newRefreshToken,
            },
            update: {
              refreshToken: newRefreshToken,
            },
          },
        },
      },
      include: { account: true },
    });
  }

  async checkPhone(phoneNumber: string) {
    return this.prisma.user.findUnique({
      where: { phone: phoneNumber },
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
