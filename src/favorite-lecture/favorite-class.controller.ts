import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { FavoriteLectureService } from './favorite-lecture.service';
import { CreateFavoriteLectureDto } from './dto/create-favorite-lecture.dto';
import { UpdateFavoriteLectureDto } from './dto/update-favorite-lecture.dto';

@Controller('favorite-lecture')
export class FavoriteLectureController {
  constructor(
    private readonly favoriteLectureService: FavoriteLectureService,
  ) {}

  @Post()
  create(@Body() createFavoriteLectureDto: CreateFavoriteLectureDto) {
    return this.favoriteLectureService.create(createFavoriteLectureDto);
  }

  @Get('/all/:userid')
  getFavoriteLectureByUserId(@Param('userid', ParseIntPipe) userId: number) {
    return this.favoriteLectureService.getFavoriteLectureByUserId(userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.favoriteLectureService.remove(+id);
  }
}
