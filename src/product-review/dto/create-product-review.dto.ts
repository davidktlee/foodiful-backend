import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsString, Max, Min } from 'class-validator';

export class CreateProductReviewDto {
  @ApiProperty({ required: true, example: '상품 리뷰입니다' })
  @IsString()
  comment: string;

  @ApiProperty({ required: true, example: 1 })
  @IsNumber()
  @Min(1)
  @Max(5)
  rating: number;

  @ApiProperty({
    required: true,
    example: 'https://aws...',
  })
  @IsString()
  reviewImg: string;

  @ApiProperty({ required: true, example: 1 })
  @IsNumber()
  userId: number;

  @ApiProperty({ required: true, example: 1 })
  @IsNumber()
  productId: number;
}
