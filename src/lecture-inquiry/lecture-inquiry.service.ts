import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLectureInquiryDto } from './dto/create-lecture-inquiry.dto';
import { UpdateLectureInquiryDto } from './dto/update-lecture-inquiry.dto';
import { LectureInquiryRepository } from './lecture-inquiry.repository';
import { LectureInquiry, Recomment } from '@prisma/client';

@Injectable()
export class LectureInquiryService {
  constructor(private lectureInquiryRepository: LectureInquiryRepository) {}

  create(
    createLectureInquiryDto: CreateLectureInquiryDto,
    userId: number,
  ): Promise<LectureInquiry> {
    return this.lectureInquiryRepository.createLectureInquiry(
      createLectureInquiryDto,
      userId,
    );
  }

  async getRecommentByInquiryId(id: number): Promise<Recomment[]> {
    const inquiry = await this.lectureInquiryRepository.getRecommentByInquiryId(
      id,
    );

    if (!inquiry) throw new NotFoundException('존재하는 문의가 없습니다.');
    return inquiry.recomment.filter((item) => !item.deleted);
  }

  findOne(id: number): Promise<LectureInquiry> {
    return this.lectureInquiryRepository.findOne(id);
  }

  update(id: number, updateLectureInquiryDto: UpdateLectureInquiryDto) {
    return `This action updates a #${id} lectureInquiry`;
  }

  remove(id: number): Promise<LectureInquiry> {
    const inquiry = this.lectureInquiryRepository.findOne(id);
    if (!inquiry)
      throw new NotFoundException('삭제할 문의가 존재하지 않습니다.');
    return this.lectureInquiryRepository.remove(id);
  }
}
