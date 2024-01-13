import { Injectable, NotFoundException } from '@nestjs/common';
import { CartRepository } from './cart.repository';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';

@Injectable()
export class CartService {
  constructor(private cartRepository: CartRepository) {}
  async create(createCartDto: CreateCartDto, userId: number) {
    // 존재하는 카트가 있다면 카트 생성 없이 카트 가져와서 그 카트 id에 데이터 추가
    // 존재하는 카트가 없다면 카트 생성 후 데이터 추가

    const cart = await this.cartRepository.createCart(createCartDto, userId);
    return cart;
  }

  async getCartByUserId(userId: number) {
    const cart = await this.cartRepository.getCartByUserId(userId);
    if (!cart) throw new NotFoundException('장바구니 내역이 없습니다');
    return cart;
  }

  updateCart(cartId: number, updateCartDto: UpdateCartDto) {
    return this.cartRepository.updateCart(cartId, updateCartDto);
  }

  deleteCartItem(cartId: number) {
    return this.cartRepository.deleteCart(cartId);
  }

  deleteCartItemByProductId(productId: number) {
    console.log(productId);
    return this.cartRepository.deleteCartItemByProductId(productId);
  }

  deleteAllItems(userId: number) {
    return this.cartRepository.deleteAllProductOnCart(userId);
  }
}
