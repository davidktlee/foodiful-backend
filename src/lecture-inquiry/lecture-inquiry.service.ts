import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLectureInquiryDto } from './dto/create-lecture-inquiry.dto';
import { UpdateLectureInquiryDto } from './dto/update-lecture-inquiry.dto';
import { LectureInquiryRepository } from './lecture-inquiry.repository';

@Injectable()
export class LectureInquiryService {
  constructor(private lectureInquiryRepository: LectureInquiryRepository) {}
  create(createLectureInquiryDto: CreateLectureInquiryDto, userId: number) {
    return this.lectureInquiryRepository.createLectureInquiry(
      createLectureInquiryDto,
      userId,
    );
  }

  findAll() {
    return `This action returns all lectureInquiry`;
  }
  async getRecommentByInquiryId(id: number) {
    const inquiry = await this.lectureInquiryRepository.getRecommentByInquiryId(
      id,
    );

    if (!inquiry) throw new NotFoundException('존재하는 문의가 없습니다.');
    return inquiry.recomment.filter((item) => !item.deleted);
  }

  findOne(id: number) {
    return this.lectureInquiryRepository.findOne(id);
  }

  update(id: number, updateLectureInquiryDto: UpdateLectureInquiryDto) {
    return `This action updates a #${id} lectureInquiry`;
  }

  remove(id: number) {
    const inquiry = this.lectureInquiryRepository.findOne(id);
    if (!inquiry)
      throw new NotFoundException('삭제할 문의가 존재하지 않습니다.');
    return this.lectureInquiryRepository.remove(id);
  }
}
