import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  readonly name: string;

  @IsNumber()
  readonly price: number;

  @IsNumber()
  readonly discount: number;

  @IsString()
  readonly description: string;

  @IsOptional()
  readonly img?: string;

  @IsString({ each: true })
  readonly tags: string[];
}
