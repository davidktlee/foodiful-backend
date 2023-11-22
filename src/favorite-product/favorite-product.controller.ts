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
import { FavoriteProductService } from './favorite-product.service';
import { CreateFavoriteProductDto } from './dto/create-favorite-product.dto';
import { UpdateFavoriteProductDto } from './dto/update-favorite-product.dto';

@Controller('favorite-product')
export class FavoriteProductController {
  constructor(
    private readonly favoriteProductService: FavoriteProductService,
  ) {}

  @Post()
  create(@Body() createFavoriteProductDto: CreateFavoriteProductDto) {
    return this.favoriteProductService.create(createFavoriteProductDto);
  }

  @Get('/:userid')
  async getFavoriteProductByUserId(
    @Param('userid', ParseIntPipe) userId: number,
  ) {
    const res = await this.favoriteProductService.getFavoriteProductByUserId(
      userId,
    );
    return res.map((item) => item.product);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.favoriteProductService.remove(+id);
  }
}
