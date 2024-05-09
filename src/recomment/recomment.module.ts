import { Module } from '@nestjs/common';
import { RecommentService } from './recomment.service';
import { RecommentController } from './recomment.controller';
import { RecommentRepository } from './recomment.repository';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [RecommentController],
  providers: [RecommentService, RecommentRepository, PrismaService],
})
export class RecommentModule {}
