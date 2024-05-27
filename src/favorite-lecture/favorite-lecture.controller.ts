import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { FavoriteLectureService } from './favorite-lecture.service';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { GetUser } from 'src/auth/get-user.decorator';
import { FavoriteLecture, Lecture, User } from '@prisma/client';
import { CreateFavoriteLectureDto } from './dto/create-favorite-lecture.dto';

@Controller('favorite-lecture')
@UseGuards(JwtGuard)
export class FavoriteLectureController {
  constructor(
    private readonly favoriteLectureService: FavoriteLectureService,
  ) {}

  @Post()
  create(
    @GetUser() user: User,
    @Body() data: CreateFavoriteLectureDto,
  ): Promise<FavoriteLecture> {
    return this.favoriteLectureService.create(user.id, data.lectureId);
  }

  @Get()
  getFavoriteLectureByUserId(
    @GetUser() user: User,
  ): Promise<(Lecture & { isLiked: boolean })[]> {
    return this.favoriteLectureService.getFavoriteLectureByUserId(user.id);
  }

  @Delete(':lectureId')
  remove(
    @GetUser() user: User,
    @Param('lectureId', ParseIntPipe) lectureId: number,
  ): Promise<FavoriteLecture> {
    return this.favoriteLectureService.remove(user.id, lectureId);
  }
}
