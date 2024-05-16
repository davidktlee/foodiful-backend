import { Transform } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class CreateFavoriteLectureDto {
  @IsNumber()
  @Transform(({ value }) => parseInt(value, 10))
  lectureId: number;
}
