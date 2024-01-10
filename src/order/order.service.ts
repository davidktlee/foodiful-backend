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
    try {
      const { orderForm, orderProduct } = createOrderDto;

      const createdOrder = await this.orderRepository.create(orderForm, userId);
      if (!createdOrder)
        throw new InternalServerErrorException('주문 생성 에러');

      const createdOrderProduct = orderProduct.map(
        ({ quantity, additionalCount, product }) => {
          this.orderProductService.create({
            orderId: createdOrder.id,
            orderCount: quantity,
            orderPrice: product.discount
              ? this.getDiscountedPrice(product.price, product.discount)
              : product.price,
            productId: product.id,
            additionalCount,
          });
        },
      );
      if (createdOrderProduct) {
        return {
          createdOrder,
          createdOrderProduct,
        };
      }
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  findAll() {
    return `This action returns all order`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  async getOrdersByUserId(userId: number) {
    try {
      const order = await this.orderRepository.getOrderByUserId(userId);
      if (!order.length)
        throw new NotFoundException('주문이 존재하지 않습니다');
      return order;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async update(
    userId: number,
    orderId: string,
    updateOrderDto: UpdateOrderDto,
  ) {
    try {
      const order = await this.orderRepository.getOrderByUserId(userId);
      console.log(order);
      if (!order.length) throw new NotFoundException('존재하는 주문 없음');
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }

  getDiscountedPrice = (price: number, discount: number) => {
    return price - price * (discount / 100);
  };
}
