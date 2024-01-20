import { Module } from '@nestjs/common';
import { RefundService } from './refund.service';
import { RefundController } from './refund.controller';
import { PrismaService } from 'src/prisma.service';
import { RefundRepository } from './refund.repository';

@Module({
  controllers: [RefundController],
  providers: [RefundService, RefundRepository, PrismaService],
})
export class RefundModule {}
