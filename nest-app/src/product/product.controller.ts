import { S3, S3Client } from '@aws-sdk/client-s3';
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
import { ApiTags } from '@nestjs/swagger';
import s3Storage from 'multer-s3';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { AwsService } from 'src/aws/aws.service';

import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './entity/product.entity';
import { ProductService } from './product.service';

@Controller('product')
@ApiTags('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  // 전체 상품 얻기
  @Get('/all')
  // @UseGuards(AuthGuard())
  getProducts(): Promise<Product[]> {
    return this.productService.getProducts();
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
    return this.productService.getProductByName(name);
  }

  // 상품 추가
  @UseGuards(RolesGuard)
  @Roles('PUBLIC')
  @Post()
  addProduct(@Body() productData: CreateProductDto): Promise<Product> {
    return this.productService.addProduct(productData);
  }

  // @Delete(':id')
  // deleteProduct(@Param('id') productId: number) {
  //   return this.productService.deleteProduct(productId);
  // }

  // @Patch(':id')
  // updateProduct(@Param('id') productId: number, @Body() updatedProduct) {
  //   return this.productService.updateProduct(productId, updatedProduct);
  // }
}
