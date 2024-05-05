import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsString } from 'class-validator';

export class CreateLectureDto {
  @ApiProperty({ required: true, example: '정규 클래스' })
  @IsString()
  readonly name: string;

  @ApiProperty({ required: true, example: 50000 })
  @IsNumber()
  readonly price: number;

  @ApiProperty({ required: true, example: 50000 })
  @IsNumber()
  readonly discount: number;

  @ApiProperty({ required: true, example: '설명 입니다' })
  @IsString()
  readonly description: string;

  @ApiProperty({ required: true, example: 120 })
  @IsNumber()
  readonly lectureDuration: number;

  @ApiProperty({
    required: true,
    example: ['https://www.google.com', 'http://www.google.com'],
  })
  @IsArray()
  readonly descImg: string[];
}
