import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
  Redirect,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from '@prisma/client';

@Controller('order')
@UseGuards(JwtGuard)
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto, @GetUser() user: User) {
    return this.orderService.create(createOrderDto, user.id);
  }

  @Get()
  getOrdersByUserId(@GetUser() user: User) {
    return this.orderService.getOrdersByUserId(user.id);
  }
  @Patch('/cancel/:id')
  cancelOrder(
    @Param('id') id: string,
    @Body() cancelReason: string,
    @GetUser() user: User,
  ) {
    return this.orderService.cancelOrder(id, cancelReason, user.id);
  }

  @Patch(':orderId')
  update(
    @GetUser() user: User,
    @Param('orderId') orderId: string,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    return this.orderService.update(user.id, orderId, updateOrderDto);
  }
}
