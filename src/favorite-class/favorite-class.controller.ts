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
import { FavoriteClassService } from './favorite-class.service';
import { CreateFavoriteClassDto } from './dto/create-favorite-class.dto';
import { UpdateFavoriteClassDto } from './dto/update-favorite-class.dto';

@Controller('favorite-class')
export class FavoriteClassController {
  constructor(private readonly favoriteClassService: FavoriteClassService) {}

  @Post()
  create(@Body() createFavoriteClassDto: CreateFavoriteClassDto) {
    return this.favoriteClassService.create(createFavoriteClassDto);
  }

  @Get('/all/:userid')
  getFavoriteClassByUserId(@Param('userid', ParseIntPipe) userId: number) {
    return this.favoriteClassService.getFavoriteClassByUserId(userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.favoriteClassService.remove(+id);
  }
}
