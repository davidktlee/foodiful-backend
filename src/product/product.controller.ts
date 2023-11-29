import {
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetUserToken } from 'src/auth/get-user-token.decorator';
import { GetUser } from 'src/auth/get-user.decorator';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entity/product.entity';
import { ProductService } from './product.service';

@Controller('product')
@ApiTags('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  // 전체 상품 얻기
  @Get('/all')
  getProducts(@GetUserToken() token: string) {
    return this.productService.getProducts(token);
  }

  @Get('/all/:userid')
  getProductsWithUserLiked(@Param('userid', ParseIntPipe) userId: number) {
    return this.productService.getProductsWithUserLiked(userId);
  }

  // id로 상품 얻기
  @Get('/:id')
  getProductById(
    @Param('id', ParseIntPipe) productId: Product['id'],
  ): Promise<Product> {
    return this.productService.getProductById(productId);
  }

  // 이름으로 상품 얻기
  @Get('/:name')
  searchProduct(@Param('name') name: string): Promise<Product> {
    console.log(name);
    return this.productService.getProductByName(name);
  }

  // 상품 추가
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  @Post()
  addProduct(@Body() productData: CreateProductDto): Promise<Product> {
    return this.productService.addProduct(productData);
  }

  // @Delete(':id')
  // deleteProduct(@Param('id') productId: number) {
  //   return this.productService.deleteProduct(productId);
  // }

  @Delete('/image/:id')
  deleteProductImg(@Param('id', ParseIntPipe) id: Product['id'], @Body() data) {
    return this.productService.deleteProductImg(id, data.img);
  }

  @Patch(':id')
  updateProduct(
    @Param('id', ParseIntPipe) productId: Product['id'],
    @Body() updatedProduct: UpdateProductDto,
  ) {
    console.log(updatedProduct);
    return this.productService.updateProduct(productId, updatedProduct);
  }
}
