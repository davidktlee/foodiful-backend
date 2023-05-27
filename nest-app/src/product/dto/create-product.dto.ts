import { Transform } from 'class-transformer';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  readonly name: string;

  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  readonly price: number;

  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  readonly discount: number;

  @IsString()
  readonly description: string;

  @IsOptional()
  readonly descImg: string[];

  @IsString({ each: true })
  readonly categories: string[];

  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  readonly deliver: boolean;
}
