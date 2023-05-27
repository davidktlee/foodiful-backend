import { S3 } from '@aws-sdk/client-s3';
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entity/product.entity';
import { ProductRepository } from './product.repository';

@Injectable()
export class ProductService {
  constructor(
    private productRepository: ProductRepository,
    private readonly config: ConfigService,
  ) {}

  async getProducts(): Promise<{ products: Product[] }> {
    try {
      const products = await this.productRepository.getProducts();
      // if (products.length === 0) {
      //   throw new ForbiddenException('상품이 없습니다');
      // }
      return { products: products };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async getProductByName(name: string): Promise<Product[]> {
    try {
      const products = await this.productRepository.getProductByName(name);
      if (!products) throw new NotFoundException('찾으시는 상품이 없습니다');
      return products;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async getProductById(id: number): Promise<Product> {
    try {
      const product = await this.productRepository.getProductById(id);
      if (!product) throw new NotFoundException('찾으시는 상품이 없습니다');
      return this.productRepository.getProductById(id);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async uploadProductImg(files: Express.MulterS3.File[]) {
    if (!files) {
      throw new BadRequestException('파일을 업로드 해주세요.');
    }
    const locations = files.map((file) => {
      return file.location;
    });
    return locations;
  }

  async deleteProductImg(
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
    console.log(key);
    return { key, message: '삭제가 완료되었습니다' };
  }

  async addProduct(productData, files) {
    try {
      const filePaths = await this.uploadProductImg(files);
      return this.productRepository.addProduct({
        ...productData,
        descImg: filePaths,
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async deleteProduct(id: number) {
    const { descImg } = await this.getProductById(id);
    descImg.forEach((file) => this.deleteProductImg(file));
    const res = this.productRepository.deleteProduct(id);
    return res;
  }

  async updateProduct(id: number, updateProductData, files): Promise<Product> {
    try {
      const product = await this.getProductById(id);
      if (!product) {
        throw new NotFoundException('수정하실 상품이 존재하지 않습니다');
      } else {
        for (const key in product) {
          if (
            product.hasOwnProperty(key) &&
            updateProductData.hasOwnProperty(key)
          ) {
            if (product[key] !== updateProductData[key]) {
              product[key] = updateProductData[key];
            }
          }
        }
        if (files) {
          product.descImg.map((file) => this.deleteProductImg(file));
          files = await this.uploadProductImg(files);
        }
        const updatedProduct = await this.productRepository.updateProduct(id, {
          ...product,
          descImg: files,
        });
        return updatedProduct;
      }
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
