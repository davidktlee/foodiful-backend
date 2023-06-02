import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FilesInterceptor } from '@nestjs/platform-express';

import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './entity/product.entity';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {
    this.productService = productService;
  }
  // 전체 상품 얻기
  @Get()
  @UseGuards(AuthGuard())
  getProducts(): Promise<{ products: Product[] }> {
    return this.productService.getProducts();
  }
  // 이름으로 상품 얻기
  @Get()
  searchProduct(@Query('name') name: string) {
    return this.productService.getProductByName(name);
  }
  // id로 상품 얻기
  @Get(':id')
  getProductById(@Param('id') productId: Product['id']) {
    return this.productService.getProductById(productId);
  }

  @Post()
  @UseInterceptors(FilesInterceptor('descImg', 10))
  addProduct(
    @Body() productData: CreateProductDto,
    @UploadedFiles() files,
  ): Promise<Product> {
    return this.productService.addProduct(productData, files);
  }

  @Delete(':id')
  deleteProduct(@Param('id') productId: number) {
    return this.productService.deleteProduct(productId);
  }

  // @Patch(':id')
  // updateProduct(@Param('id') productId: number, @Body() updatedProduct) {
  //   return this.productService.updateProduct(productId, updatedProduct);
  // }
}
