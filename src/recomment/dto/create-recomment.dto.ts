import { Transform } from 'class-transformer';
import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class CreateRecommentDto {
  @IsNumber()
  @Transform(({ value }) => parseInt(value, 10))
  parentId: number;

  @IsString()
  comment: string;

  @IsBoolean()
  isSecret: boolean;
}
