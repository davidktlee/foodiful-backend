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
  async getProducts(): Promise<{ success: boolean; data: Product[] }> {
    const data = await this.productService.getProducts();
    if (data) return { success: true, data };
  }

  // id로 상품 얻기
  @Get('/:id')
  async getProductById(
    @Param('id', ParseIntPipe) productId: Product['id'],
  ): Promise<{ success: boolean; data: Product }> {
    const data = await this.productService.getProductById(productId);
    if (data) return { success: true, data };
  }

  // 이름으로 상품 얻기
  @Get('/:name')
  async searchProduct(
    @Param('name') name: string,
  ): Promise<{ success: boolean; data: Product }> {
    const data = await this.productService.getProductByName(name);
    return { success: true, data };
  }

  // 상품 추가
  @UseGuards(RolesGuard)
  @Roles('PUBLIC')
  @Post()
  async addProduct(
    @Body() productData: CreateProductDto,
  ) /* Promise<Product>*/ {
    const data = await this.productService.addProduct(productData);
    return { success: true, data };
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
