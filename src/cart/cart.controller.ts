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
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/get-user.decorator';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';

@Controller('cart')
@UseGuards(JwtGuard)
export class CartController {
  constructor(private readonly cartService: CartService) {}

  /**
   * @TODO: 상품 추가 시
상품 id, 상품 개수, 추가 상품 개수, user id, 를 받는다.

userid로 카트 조회 후 카트가 이미 있다면 productOnCart의 cart id를 넣고 상품id와 상품 개수, 추가 상품 개수를 넣는다. 
없다면 카트 생성 후 그 카트 id에 위 데이터를 똑같이 넣는다.
   */
  @Post()
  create(@GetUser() user: User, @Body() createCartDto: CreateCartDto) {
    return this.cartService.create(createCartDto, user.id);
  }

  @Get()
  findCartByUserId(@GetUser() user: User) {
    return this.cartService.getCartByUserId(user.id);
  }

  @Patch(':cartid/:productid')
  updateCart(
    @Param('cartid', ParseIntPipe) cartId: number,
    @Param('productid', ParseIntPipe) productId: number,
    @Body() updateCartDto: UpdateCartDto,
  ) {
    return this.cartService.updateCart(cartId, productId, updateCartDto);
  }

  @Delete(':cartid/:productid')
  deleteCartItem(
    @Param('cartid', ParseIntPipe) cartId: number,
    @Param('productid', ParseIntPipe) productId: number,
  ) {
    return this.cartService.deleteCartItem(cartId, productId);
  }

  @Delete('/all/:cartid')
  deleteAllItems(@Param('cartid', ParseIntPipe) cartId: number) {
    return this.cartService.deleteAllItems(cartId);
  }
}
