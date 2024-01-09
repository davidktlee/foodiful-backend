import { IsNumber, IsString } from 'class-validator';

export class CreateOrderProductDto {
  @IsString()
  orderId: string;
  @IsNumber()
  orderCount: number;
  @IsNumber()
  orderPrice: number;
  @IsNumber()
  productId: number;
  @IsNumber()
  additionalCount: number;
}
