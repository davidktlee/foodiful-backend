import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ProductRepository } from 'src/product/product.repository';
import { UserRepository } from 'src/user/user.repository';
import { CreateProductReviewDto } from './dto/create-product-review.dto';
import { UpdateProductReviewDto } from './dto/update-product-review.dto';
import { ProductReviewRepository } from './product-review.repository';
import { ProductReview } from '@prisma/client';

@Injectable()
export class ProductReviewService {
  constructor(
    private productReviewRepository: ProductReviewRepository,
    private userRepository: UserRepository,
    private productRepository: ProductRepository,
  ) {}
  createProductReview(
    createProductReviewDto: CreateProductReviewDto,
  ): Promise<ProductReview> {
    const user = this.userRepository.getUserById(createProductReviewDto.userId);
    const product = this.productRepository.getProductById(
      createProductReviewDto.productId,
    );
    if (!user || !product)
      throw new NotFoundException('상품이 없거나 유저가 없습니다');
    return this.productReviewRepository.createProductReview(
      createProductReviewDto,
    );
  }

  getAllProductReviewsByProductId(productId: number): Promise<ProductReview[]> {
    return this.productReviewRepository.getAllProductReviews(productId);
  }

  updateProductReview(
    reviewId: number,
    updateProductReviewDto: UpdateProductReviewDto,
  ): Promise<ProductReview> {
    const productReview =
      this.productReviewRepository.getProductReviewById(reviewId);
    if (!productReview)
      throw new NotFoundException('찾으시는 상품 리뷰가 없습니다.');
    return this.productReviewRepository.updateProductReview(
      reviewId,
      updateProductReviewDto,
    );
  }

  async deleteProductReview(id: number): Promise<ProductReview> {
    const productReview =
      await this.productReviewRepository.getProductReviewById(id);
    if (!productReview) throw new NotFoundException('삭제하실 리뷰가 없습니다');
    return this.productReviewRepository.deleteProductReview(id);
  }

  getUserProductReviews(userId: number): Promise<ProductReview[]> {
    return this.productReviewRepository.getUserProductReviews(userId);
  }
}
