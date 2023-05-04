import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './entity/product.entity';

@Injectable()
export class ProductService {
  private products: Product[] = [
    {
      id: '1',
      name: '떡',
      description: '맛있는 떡',
      price: 10000,
      discount: 10,
    },
  ];

  getProducts() {
    return this.products;
  }

  getProduct(name: string): Product[] {
    const product = this.products.filter((product) => product.name === name);
    if (product.length < 1) {
      throw new NotFoundException(`찾으시는 상품이 없습니다 상품:${name}`);
    }
    return product;
  }

  getProductById(id: string): Product {
    const product = this.products.find((product) => product.id === id);
    if (!product) {
      throw new NotFoundException(`찾으시는 상품이 없습니다 상품ID:${id}`);
    }
    return product;
  }

  addProduct(productData: CreateProductDto): string {
    this.products.push({
      id: String(this.products.length + 1),
      ...productData,
    });
    return '상품 등록이 완료되었습니다';
  }

  deleteProduct(id: string): boolean {
    this.getProductById(id);
    this.products = this.products.filter((product) => product.id !== id);
    return true;
  }

  updateProduct(
    id: string,
    productData: Product,
  ): { updatedProduct: Product; message: string } {
    const product = this.getProductById(id);
    this.deleteProduct(id);
    // spread 문법으로 뒤에 오는 데이터로 전자의 데이터 덮어쓰기
    this.products.push({ ...product, ...productData });
    const updatedProduct = this.getProductById(id);
    return { updatedProduct, message: '수정이 완료되었습니다' };
  }
}
