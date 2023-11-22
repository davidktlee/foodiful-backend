import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ClassRepository } from 'src/class/class.repository';
import { CreateFavoriteClassDto } from './dto/create-favorite-class.dto';
import { UpdateFavoriteClassDto } from './dto/update-favorite-class.dto';
import { FavoriteClassRepository } from './favorite-class.repository';

@Injectable()
export class FavoriteClassService {
  constructor(
    private favoriteClassRepository: FavoriteClassRepository,
    private classRepository: ClassRepository,
  ) {}
  create(createFavoriteClassDto: CreateFavoriteClassDto) {
    return this.favoriteClassRepository.create(createFavoriteClassDto);
  }

  async getFavoriteClassByUserId(userId: number) {
    return this.favoriteClassRepository.getFavoriteClassByUserId(userId);
  }

  remove(id: number) {
    return `This action removes a #${id} favoriteClass`;
  }
}
