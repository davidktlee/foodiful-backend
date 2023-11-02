import { OrderProduct } from '@prisma/client';

export class Order {
  orderDate: string;
  quantity: number;
  userId: number;
  id: number;
  deliverAddress: string;
  deliverName: string;
  requirement: string;
  totalPrice: number;
  deliverPhone: string;
  orderStatus: boolean;
  orderProduct: OrderProduct[];
}
