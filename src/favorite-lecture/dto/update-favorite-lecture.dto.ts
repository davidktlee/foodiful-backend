import { PartialType } from '@nestjs/swagger';
import { CreateFavoriteLectureDto } from './create-favorite-lecture.dto';

export class UpdateFavoriteLectureDto extends PartialType(
  CreateFavoriteLectureDto,
) {}
