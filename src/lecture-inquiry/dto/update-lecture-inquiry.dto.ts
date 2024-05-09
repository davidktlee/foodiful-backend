import { PartialType } from '@nestjs/swagger';
import { CreateLectureInquiryDto } from './create-lecture-inquiry.dto';

export class UpdateLectureInquiryDto extends PartialType(CreateLectureInquiryDto) {}
