import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateFavoriteProductDto } from './dto/create-favorite-product.dto';
import { UpdateFavoriteProductDto } from './dto/update-favorite-product.dto';
import { FavoriteProductRepository } from './favorite-product.repository';

@Injectable()
export class FavoriteProductService {
  constructor(private favoriteProductRepository: FavoriteProductRepository) {}
  create(userId: number, productId: number) {
    return this.favoriteProductRepository.create(userId, productId);
  }

  async getFavoriteProductByUserId(userId: number) {
    try {
      const favoriteProducts =
        await this.favoriteProductRepository.getFavoriteProductByUserId(userId);
      if (favoriteProducts.length < 0)
        throw new NotFoundException('좋아요 한 상품이 없습니다.');
      else favoriteProducts.map((products) => products.product);
    } catch {
      throw new InternalServerErrorException('서버에서 에러 발생');
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} favoriteProduct`;
  }

  update(id: number, updateFavoriteProductDto: UpdateFavoriteProductDto) {
    return `This action updates a #${id} favoriteProduct`;
  }

  remove(userId: number, productId: number) {
    return this.favoriteProductRepository.delete(userId, productId);
  }
}
