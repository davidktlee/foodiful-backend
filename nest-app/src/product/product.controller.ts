import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './entity/product.entity';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  // 전체 상품 얻기
  @Get()
  getProducts(): Product[] {
    return this.productService.getProducts();
  }
  // 이름으로 상품 얻기
  @Get()
  searchProduct(@Query('name') searchingProduct: string) {
    return this.productService.getProduct(searchingProduct);
  }
  // id로 상품 얻기
  @Get(':id')
  getProductById(@Param('id') productId: Product['id']) {
    return this.productService.getProductById(productId);
  }

  @Post()
  addProduct(@Body() productData: CreateProductDto) {
    return this.productService.addProduct(productData);
  }

  @Delete(':id')
  deleteProduct(@Param('id') productId: Product['id']) {
    return this.productService.deleteProduct(productId);
  }

  @Patch(':id')
  updateProduct(@Param('id') productId: string, @Body() updatedProduct) {
    return this.productService.updateProduct(productId, updatedProduct);
  }
}
