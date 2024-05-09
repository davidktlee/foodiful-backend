import { Module } from '@nestjs/common';
import { LectureInquiryService } from './lecture-inquiry.service';
import { LectureInquiryController } from './lecture-inquiry.controller';
import { LectureInquiryRepository } from './lecture-inquiry.repository';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [LectureInquiryController],
  providers: [LectureInquiryService, LectureInquiryRepository, PrismaService],
})
export class LectureInquiryModule {}
