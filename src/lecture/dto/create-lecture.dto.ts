import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsArray, IsBoolean, IsNumber, IsString } from 'class-validator';

export class CreateLectureDto {
  @ApiProperty({ required: true, example: '정규 클래스' })
  @IsString()
  readonly name: string;

  @ApiProperty({ required: true, example: 50000 })
  @IsNumber()
  @Transform(({ value }) => parseInt(value, 10))
  readonly price: number;

  @ApiProperty({ required: true, example: 50000 })
  @IsNumber()
  @Transform(({ value }) => parseInt(value, 10))
  readonly discount: number;

  @IsString()
  @ApiProperty({ required: true, example: '간단 설명 입니다' })
  readonly subTitle: string;

  @ApiProperty({ required: true, example: '설명 입니다' })
  @IsString()
  readonly description: string;

  @ApiProperty({ required: true, example: 120 })
  @IsNumber()
  @Transform(({ value }) => parseInt(value, 10))
  readonly lectureDuration: number;

  @ApiProperty({
    required: true,
    example: ['https://www.google.com', 'http://www.google.com'],
  })
  @IsArray()
  readonly descImg: string[];

  @IsBoolean()
  regular: boolean;
}
