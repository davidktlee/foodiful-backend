import { S3 } from '@aws-sdk/client-s3';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthService } from 'src/auth/auth.service';
import { FavoriteProductRepository } from 'src/favorite-product/favorite-product.repository';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entity/product.entity';
import { ProductRepository } from './product.repository';

@Injectable()
export class ProductService {
  constructor(
    private productRepository: ProductRepository,
    private favoriteProductRepository: FavoriteProductRepository,
    private authService: AuthService,
    private readonly config: ConfigService,
  ) {}

  async getProducts(token?: string): Promise<Product[]> {
    if (token) {
      const isVerified = await this.authService.validAccessToken(token);
      if (isVerified) {
        const { id } = this.authService.decodeJWTToken(token);

        return this.getProductsWithUserLiked(id);
      }
    } else {
      const products = await this.productRepository.getProducts();
      if (!products.length) {
        return [];
      }
      return products;
    }
  }

  async getProductsWithUserLiked(userId: number) {
    const products = await this.productRepository.getProducts();
    if (!products.length) return [];

    const productIdsWithLiked =
      await this.favoriteProductRepository.getLikedProductIds(userId);

    const productsWithLiked = products.map((product) => {
      return {
        ...product,
        isLiked: productIdsWithLiked.includes(product.id),
      };
    });

    return productsWithLiked;
  }

  async getProductByName(name: string): Promise<Product> {
    const products = await this.productRepository.getProductByName(name);
    if (!products) throw new NotFoundException('찾으시는 상품이 없습니다');
    return products;
  }

  async getProductById(id: number): Promise<Product> {
    const product = await this.productRepository.getProductById(id);
    if (!product) throw new NotFoundException('찾으시는 상품이 없습니다');
    return product;
  }

  async deleteProductImg(
    id: number,
    key: string,
  ): Promise<{ key: string; message: string }> {
    const s3 = new S3({
      region: this.config.get('AWS_BUCKET_REGION'),
      credentials: {
        accessKeyId: this.config.get('AWS_ACCESS_KEY_ID'),
        secretAccessKey: this.config.get('AWS_SECRET_ACCESS_KEY'),
      },
    });
    const startKey = key.indexOf('product');
    await s3.deleteObject({
      Bucket: this.config.get('AWS_BUCKET_NAME'),
      Key: key.slice(startKey, key.length),
    });
    const { descImg } = await this.productRepository.getProductById(id);

    const removedImg = descImg.filter((img) => !img.includes(key));

    await this.productRepository.updateProductImage(id, removedImg);
    return { key, message: '삭제가 완료되었습니다' };
  }

  async addProduct(productData: CreateProductDto) {
    const product = await this.productRepository.getProductByName(
      productData.name,
    );
    if (product) throw new ConflictException('이미 존재하는 상품입니다');
    return this.productRepository.addProduct(productData);
  }

  // async deleteProduct(id: number) {
  //   const { descImg } = await this.getProductById(id);
  //   descImg.forEach((file) => this.deleteProductImg(file));
  //   const res = this.productRepository.deleteProduct(id);
  //   return res;
  // }

  async updateProduct(id: number, updateProductData: UpdateProductDto) {
    const product = await this.getProductById(id);
    if (!product) {
      throw new NotFoundException('수정하실 상품이 존재하지 않습니다');
    }
    return this.productRepository.updateProduct(id, updateProductData);
  }
}
