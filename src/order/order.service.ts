import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { CartService } from 'src/cart/cart.service';
import { OrderProductService } from 'src/order-product/order-product.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderRepository } from './order.repository';

@Injectable()
export class OrderService {
  constructor(
    private orderRepository: OrderRepository,
    private orderProductService: OrderProductService,
    private cartService: CartService,
  ) {}

  async create(createOrderDto: CreateOrderDto, userId: User['id']) {
    const { orderForm, orderProduct } = createOrderDto;

    const createdOrder = await this.orderRepository.create(orderForm, userId);
    if (!createdOrder) throw new InternalServerErrorException('주문 생성 에러');

    orderProduct.forEach(async ({ quantity, additionalCount, product }) => {
      this.orderProductService.create({
        orderId: createdOrder.id,
        orderCount: quantity,
        orderPrice: product.discount
          ? this.getDiscountedPrice(product.price, product.discount)
          : product.price,
        productId: product.id,
        additionalCount,
      });
      // 카트에 아이템 없이 바로 구매할 수도 있기 때문에 카트에 product가 있을 때만 삭제
      const carts = await this.cartService.getCartByProductId(product.id);
      if (carts) await this.cartService.deleteCartItemByProductId(product.id);
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

  remove(id: string) {
    return this.orderRepository.delete(id);
  }

  getDiscountedPrice = (price: number, discount: number) => {
    return price - price * (discount / 100);
  };
}
