import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
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

  @Get()
  findAll() {
    return this.favoriteClassService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.favoriteClassService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFavoriteClassDto: UpdateFavoriteClassDto,
  ) {
    return this.favoriteClassService.update(+id, updateFavoriteClassDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.favoriteClassService.remove(+id);
  }
}
