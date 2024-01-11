import { Injectable } from '@nestjs/common';
import { CreateOrderProductDto } from './dto/create-order-product.dto';
import { UpdateOrderProductDto } from './dto/update-order-product.dto';
import { OrderProductRepository } from './order-product.repository';

@Injectable()
export class OrderProductService {
  constructor(private orderProductRepository: OrderProductRepository) {}
  async create(createOrderProductDto: CreateOrderProductDto) {
    await this.orderProductRepository.create(createOrderProductDto);
  }

  findAll() {
    return `This action returns all orderProduct`;
  }

  findOne(id: number) {
    return `This action returns a #${id} orderProduct`;
  }

  update(id: number, updateOrderProductDto: UpdateOrderProductDto) {
    return `This action updates a #${id} orderProduct`;
  }

  remove(id: number) {
    return `This action removes a #${id} orderProduct`;
  }
}
