import { IsNumber, IsString } from 'class-validator';

export class CreateRefundDto {
  @IsNumber()
  userId: number;

  @IsString()
  orderId: string;
}
