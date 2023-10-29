import { Module } from '@nestjs/common';
import { ClassService } from './class.service';
import { ClassController } from './class.controller';
import { ClassRepository } from './class.repository';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [ClassController],
  providers: [ClassService, ClassRepository, PrismaService],
})
export class ClassModule {}
