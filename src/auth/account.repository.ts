import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AccountRepository {
  constructor(private readonly prisma: PrismaService) {}
  async updateRefreshToken(userId: number, refreshToken: string) {
    return this.prisma.account.update({
      where: { userId },
      data: { refreshToken },
    });
  }
}
