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
    // orderForm과 orderProduct를 받아서 orderProduct는 orderProductService map돌려서 호출
    // orderProduct는 orderId에 종속되기 때문에 order이 생긴 후에 생성
    const { orderForm, orderProduct } = createOrderDto;

    const createdOrder = await this.orderRepository.create(orderForm, userId);

    if (createdOrder) {
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
    } else {
      throw new InternalServerErrorException('서버에서 에러가 났습니다');
    }
  }

  findAll() {
    return `This action returns all order`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  async getOrderByUserId(id: number) {
    const orders = await this.orderRepository.getOrderByUserId(id);
    if (orders.length < 0) throw new NotFoundException('주문 내역이 없습니다');
    return orders;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }

  getDiscountedPrice = (price: number, discount: number) => {
    return price - price * (discount / 100);
  };
}
