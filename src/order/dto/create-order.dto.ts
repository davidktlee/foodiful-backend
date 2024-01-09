import { Product } from '@prisma/client';
import { IsArray, IsObject } from 'class-validator';

export class CreateOrderDto {
  @IsObject()
  orderForm: OrderForm;

  @IsArray()
  orderProduct: OrderProduct[];
}

type OrderProduct = {
  product: Product;
  quantity: number;
  additionalCount: number;
};
type OrderForm = {
  deliverName: string;
  deliverAddress: string;
  deliverSpecificAddress: string;
  deliverPhone: string;
  postalCode: string;
  requirement: string;
  totalPrice: number;
  quantity: number;
  id: string;
};
