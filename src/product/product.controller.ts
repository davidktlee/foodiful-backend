import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
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