import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFavoriteProductDto } from './dto/create-favorite-product.dto';
import { FavoriteProductRepository } from './favorite-product.repository';

@Injectable()
export class FavoriteProductService {
  constructor(
    private favoriteProductRepository: FavoriteProductRepository, // private productService: ProductService,
  ) {}
  create(userId: number, productId: CreateFavoriteProductDto['productId']) {
    return this.favoriteProductRepository.create(userId, productId);
  }

  async getFavoriteProductByUserId(userId: number) {
    const favoriteProducts =
      await this.favoriteProductRepository.getFavoriteProductByUserId(userId);

    if (!favoriteProducts.length) {
      throw new NotFoundException('좋아요 한 상품이 없습니다.');
    }
    return favoriteProducts.map((products) => ({
      ...products.product,
      isLiked: true,
    }));
  }

  remove(userId: number, productId: number) {
    return this.favoriteProductRepository.delete(userId, productId);
  }
}
