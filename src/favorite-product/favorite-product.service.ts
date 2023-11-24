import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateFavoriteProductDto } from './dto/create-favorite-product.dto';
import { UpdateFavoriteProductDto } from './dto/update-favorite-product.dto';
import { FavoriteProductRepository } from './favorite-product.repository';

@Injectable()
export class FavoriteProductService {
  constructor(private favoriteProductRepository: FavoriteProductRepository) {}
  create(userId: number, productId: number) {
    return this.favoriteProductRepository.create(userId, productId);
  }

  getFavoriteProductByUserId(userId: number) {
    try {
      return this.favoriteProductRepository.getFavoriteProductByUserId(userId);
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
