import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { FavoriteProductService } from './favorite-product.service';
import { CreateFavoriteProductDto } from './dto/create-favorite-product.dto';
import { UpdateFavoriteProductDto } from './dto/update-favorite-product.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from '@prisma/client';
import { ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';

@Controller('favorite-product')
export class FavoriteProductController {
  constructor(
    private readonly favoriteProductService: FavoriteProductService,
  ) {}

  @ApiOkResponse({
    description: '상품이 즐겨찾기 목록에 추가되었습니다',
  })
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Post()
  create(@GetUser() user: User, @Body() data: CreateFavoriteProductDto) {
    return this.favoriteProductService.create(user.id, data.productId);
  }

  @Get('/:userid')
  getFavoriteProductByUserId(@Param('userid', ParseIntPipe) userId: number) {
    return this.favoriteProductService.getFavoriteProductByUserId(userId);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  remove(@GetUser() user: User, @Param('id', ParseIntPipe) productId: number) {
    return this.favoriteProductService.remove(user.id, productId);
  }
}
