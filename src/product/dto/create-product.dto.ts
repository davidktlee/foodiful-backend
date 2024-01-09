import { Transform } from 'class-transformer';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly subTitle: string;

  @IsNumber()
  @Transform(({ value }) => parseInt(value, 10))
  readonly price: number;

  @IsNumber()
  @Transform(({ value }) => parseInt(value, 10))
  readonly discount: number;

  @IsNumber()
  @Transform(({ value }) => parseInt(value, 10))
  readonly quantity: number;

  @IsString()
  readonly description: string;

  @IsOptional()
  readonly descImg: string[];

  @IsString({ each: true })
  readonly categories: string[];

  @IsBoolean()
  readonly deliver: boolean;
}
