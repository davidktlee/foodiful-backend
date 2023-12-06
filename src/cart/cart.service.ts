import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
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
    try {
      const cart = await this.cartRepository.getCartByUserId(userId);

      if (!cart) {
        const createdCart = await this.cartRepository.createCart(userId);
        return this.productOnCartRepository.createProductOnCart(
          createCartDto,
          createdCart.id,
        );
      } else {
        cart.productOnCart.forEach((product) => {
          if (product.productId === createCartDto.productId)
            throw new ConflictException('이미 장바구니에 존재하는 상품입니다');
        });
        return this.productOnCartRepository.createProductOnCart(
          createCartDto,
          cart.id,
        );
      }
    } catch (error) {
      throw new InternalServerErrorException('서버 에러 발생');
    }
  }

  findAll() {
    return `This action returns all cart`;
  }

  async getCartByUserId(userId: number) {
    const cart = await this.cartRepository.getCartByUserId(userId);
    if (!cart) throw new NotFoundException('장바구니 내역이 없습니다');
    return this.getCartProductsCartId(cart.id);
  }

  async getCartProductsCartId(cartId: number) {
    try {
      return this.productOnCartRepository.getProductOnCart(cartId);
    } catch (error) {
      throw new InternalServerErrorException('서버 에러 발생');
    }
  }

  updateCart(cartId: number, productId: number, updateCartDto: UpdateCartDto) {
    return this.productOnCartRepository.updateProductOnCart(
      cartId,
      productId,
      updateCartDto,
    );
  }

  deleteCartItem(cartId: number, productId: number) {
    return this.productOnCartRepository.deleteProductOnCart(cartId, productId);
  }

  deleteAllItems(cartId: number) {
    return this.productOnCartRepository.deleteAllProductOnCart(cartId);
  }
}
