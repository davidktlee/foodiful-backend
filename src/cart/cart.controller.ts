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
} from '@nestjs/common';
import { Cart, Prisma, User } from '@prisma/client';
import { GetUser } from 'src/auth/get-user.decorator';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';

@Controller('cart')
@UseGuards(JwtGuard)
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  create(@GetUser() user: User, @Body() createCartDto: CreateCartDto) {
    return this.cartService.create(createCartDto, user.id);
  }

  @Get()
  findCartByUserId(@GetUser() user: User) {
    return this.cartService.getCartByUserId(user.id);
  }

  @Patch(':cartId')
  updateCart(
    @Param('cartId', ParseIntPipe) cartId: number,
    @Body() updateCartDto: UpdateCartDto,
  ): Promise<Cart> {
    return this.cartService.updateCart(cartId, updateCartDto);
  }

  @Delete('/all')
  deleteAllItems(@GetUser() user: User): Promise<Prisma.BatchPayload> {
    return this.cartService.deleteAllItems(user.id);
  }

  @Delete(':cartId')
  deleteCartItem(@Param('cartId', ParseIntPipe) cartId: number): Promise<Cart> {
    return this.cartService.deleteCartItem(cartId);
  }
}
