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
import { FavoriteProductService } from './favorite-product.service';
import { CreateFavoriteProductDto } from './dto/create-favorite-product.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from '@prisma/client';
import { ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';

@Controller('favorite-product')
@UseGuards(JwtGuard)
export class FavoriteProductController {
  constructor(
    private readonly favoriteProductService: FavoriteProductService,
  ) {}

  @Get()
  getFavoriteProductByUserId(@GetUser() user: User) {
    return this.favoriteProductService.getFavoriteProductByUserId(user.id);
  }

  @ApiOkResponse({
    description: '상품이 즐겨찾기 목록에 추가되었습니다',
  })
  @ApiBearerAuth()
  @Post()
  create(@GetUser() user: User, @Body() data: CreateFavoriteProductDto) {
    return this.favoriteProductService.create(user.id, data.productId);
  }

  @Delete(':productId')
  remove(
    @GetUser() user: User,
    @Param('productId', ParseIntPipe) productId: number,
  ) {
    return this.favoriteProductService.remove(user.id, productId);
  }
}
