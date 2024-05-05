import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  // db와 연결 해주는

  async onModuleInit() {
    await this.$connect();
  }
}
