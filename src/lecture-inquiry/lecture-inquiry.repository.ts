import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateLectureInquiryDto } from './dto/create-lecture-inquiry.dto';

@Injectable()
export class LectureInquiryRepository {
  constructor(private prisma: PrismaService) {}

  createLectureInquiry(
    lectureInquiry: CreateLectureInquiryDto,
    userId: number,
  ) {
    return this.prisma.lectureInquiry.create({
      data: { ...lectureInquiry, userId },
    });
  }

  findOne(id: number) {
    return this.prisma.lectureInquiry.findUnique({
      where: { id },
      include: { recomment: true },
    });
  }

  getRecommentByInquiryId(id: number) {
    return this.prisma.lectureInquiry.findUnique({
      where: { id },
      include: { recomment: true },
    });
  }

  remove(id: number) {
    return this.prisma.lectureInquiry.delete({
      where: { id },
    });
  }
}
