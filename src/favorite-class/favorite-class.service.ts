import { Injectable } from '@nestjs/common';
import { CreateFavoriteClassDto } from './dto/create-favorite-class.dto';
import { UpdateFavoriteClassDto } from './dto/update-favorite-class.dto';

@Injectable()
export class FavoriteClassService {
  create(createFavoriteClassDto: CreateFavoriteClassDto) {
    return 'This action adds a new favoriteClass';
  }

  findAll() {
    return `This action returns all favoriteClass`;
  }

  findOne(id: number) {
    return `This action returns a #${id} favoriteClass`;
  }

  update(id: number, updateFavoriteClassDto: UpdateFavoriteClassDto) {
    return `This action updates a #${id} favoriteClass`;
  }

  remove(id: number) {
    return `This action removes a #${id} favoriteClass`;
  }
}
