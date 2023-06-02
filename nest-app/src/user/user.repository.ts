import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

import { CreateUserDto } from '../auth/dto/create-user.dto';
import { UpdateUserDto } from '../auth/dto/update-user.dto';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getUser(): Promise<User[]> {
    return this.prisma.user.findMany();
  }
  async getUserById(id: number): Promise<User> {
    return this.prisma.user.findUnique({
      where: { id },
      // include: { product: true },
    });
  }

  async getUserByUserId(userId: string): Promise<User> {
    return this.prisma.user.findUnique({
      where: { userId },
      // include: { product: true },
    });
  }

  async createUser(user): Promise<User> {
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
}
