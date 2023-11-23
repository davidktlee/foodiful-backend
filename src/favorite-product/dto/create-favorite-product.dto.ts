import { Transform } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class CreateFavoriteProductDto {
  @IsNumber()
  @Transform(({ value }) => parseInt(value, 10))
  productId: number;
}
