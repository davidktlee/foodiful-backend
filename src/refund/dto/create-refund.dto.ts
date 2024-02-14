import { IsDate, IsNumber, IsString } from 'class-validator';

export class CreateRefundDto {
  @IsNumber()
  userId: number;

  @IsString()
  orderId: string;

  @IsString()
  refundReason: string;

  @IsNumber()
  totalPrice: number;
}
