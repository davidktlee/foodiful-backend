import { Injectable, NotFoundException } from '@nestjs/common';
import { CartRepository } from './cart.repository';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { ProductOnCartRepository } from './productOnCart.repository';

@Injectable()
export class CartService {
  constructor(
    private cartRepository: CartRepository,
    private productOnCartRepository: ProductOnCartRepository,
  ) {}
  async create(createCartDto: CreateCartDto, userId: number) {
    // 존재하는 카트가 있다면 카트 생성 없이 카트 가져와서 그 카트 id에 데이터 추가
    // 존재하는 카트가 없다면 카트 생성 후 데이터 추가
    const cart = await this.cartRepository.getCartByUserId(userId);

    if (!cart) {
      const createdCart = await this.cartRepository.createCart(userId);
      return this.productOnCartRepository.createProductOnCart(
        createCartDto,
        createdCart.id,
      );
    } else {
      return this.productOnCartRepository.createProductOnCart(
        createCartDto,
        cart.id,
      );
    }
  }

  findAll() {
    return `This action returns all cart`;
  }

  async getCartByUserId(userId: number) {
    const cart = await this.cartRepository.getCartByUserId(userId);

    if (!cart) throw new NotFoundException('장바구니 내역이 없습니다');
    return cart;
  }

  async getCartProductsCartId(cartId: number) {
    return;
  }

  update(id: number, updateCartDto: UpdateCartDto) {
    return `This action updates a #${id} cart`;
  }

  remove(id: number) {
    return `This action removes a #${id} cart`;
  }
}
