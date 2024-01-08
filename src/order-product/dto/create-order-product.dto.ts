import { IsNumber } from 'class-validator';

export class CreateOrderProductDto {
  @IsNumber()
  orderId: number;
  @IsNumber()
  orderCount: number;
  @IsNumber()
  orderPrice: number;
  @IsNumber()
  productId: number;
  @IsNumber()
  additionalCount: number;
}
