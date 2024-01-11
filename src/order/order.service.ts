import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { OrderProductService } from 'src/order-product/order-product.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderRepository } from './order.repository';

@Injectable()
export class OrderService {
  constructor(
    private orderRepository: OrderRepository,
    private orderProductService: OrderProductService,
  ) {}

  async create(createOrderDto: CreateOrderDto, userId: User['id']) {
    const { orderForm, orderProduct } = createOrderDto;

    const createdOrder = await this.orderRepository.create(orderForm, userId);
    if (!createdOrder) throw new InternalServerErrorException('주문 생성 에러');

    orderProduct.forEach(({ quantity, additionalCount, product }) => {
      this.orderProductService.create({
        orderId: createdOrder.id,
        orderCount: quantity,
        orderPrice: product.discount
          ? this.getDiscountedPrice(product.price, product.discount)
          : product.price,
        productId: product.id,
        additionalCount,
      });
    });

    return createdOrder;
  }

  findAll() {
    return `This action returns all order`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  async getOrdersByUserId(userId: number) {
    const order = await this.orderRepository.getOrderByUserId(userId);
    if (!order.length) throw new NotFoundException('주문이 존재하지 않습니다');
    return order;
  }

  async update(
    userId: number,
    orderId: string,
    updateOrderDto: UpdateOrderDto,
  ) {
    const order = await this.orderRepository.getOrderByUserId(userId);
    console.log(order);
    if (!order.length) throw new NotFoundException('존재하는 주문 없음');
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }

  getDiscountedPrice = (price: number, discount: number) => {
    return price - price * (discount / 100);
  };
}
