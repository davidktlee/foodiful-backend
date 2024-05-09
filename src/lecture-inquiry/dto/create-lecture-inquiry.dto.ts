import { Transform } from 'class-transformer';
import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class CreateLectureInquiryDto {
  @IsNumber()
  @Transform(({ value }) => parseInt(value, 10))
  lectureId: number;

  @IsString()
  comment: string;

  @IsBoolean()
  isSecret: boolean;
}
