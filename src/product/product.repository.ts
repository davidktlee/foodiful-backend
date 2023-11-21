import { Injectable } from '@nestjs/common';
import { Product } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getProducts(): Promise<Product[]> {
    return this.prisma.product.findMany();
  }

  async getProductsWithUserId(userId: number) {
    const products = await this.prisma.product.findMany();
    const productsWithLiked = await this.prisma.favoriteProduct.findMany({
      where: { userId },
      select: { productId: true },
    });
    console.log(productsWithLiked);
  }

  async getProductByName(name: string): Promise<Product> {
    return this.prisma.product.findUnique({
      where: { name },
    });
  }

  async getProductById(id: number): Promise<Product> {
    return this.prisma.product.findUnique({
      where: { id },
      include: { reviews: true },
    });
  }

  async addProduct(product: CreateProductDto): Promise<Product> {
    return this.prisma.product.create({ data: { ...product } });
  }

  async deleteProduct(id: number): Promise<Product> {
    return this.prisma.product.delete({
      where: { id },
    });
  }

  async updateProductImage(id: number, removedImg: string[]) {
    return this.prisma.product.update({
      where: { id },
      data: {
        descImg: removedImg,
      },
    });
  }
  async updateProduct(id: number, product: UpdateProductDto): Promise<Product> {
    return this.prisma.product.update({
      where: { id },
      data: { ...product },
    });
  }
}
