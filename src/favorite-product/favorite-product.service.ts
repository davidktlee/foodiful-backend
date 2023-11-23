import { Injectable } from '@nestjs/common';
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
    return this.favoriteProductRepository.getFavoriteProductByUserId(userId);
  }

  findOne(id: number) {
    return `This action returns a #${id} favoriteProduct`;
  }

  update(id: number, updateFavoriteProductDto: UpdateFavoriteProductDto) {
    return `This action updates a #${id} favoriteProduct`;
  }

  remove(id: number) {
    return `This action removes a #${id} favoriteProduct`;
  }
}
