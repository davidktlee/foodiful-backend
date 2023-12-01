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

@Injectable()
export class ProductReviewService {
  constructor(
    private productReviewRepository: ProductReviewRepository,
    private userRepository: UserRepository,
    private productRepository: ProductRepository,
  ) {}
  createProductReview(createProductReviewDto: CreateProductReviewDto) {
    try {
      const user = this.userRepository.getUserById(
        createProductReviewDto.userId,
      );
      const product = this.productRepository.getProductById(
        createProductReviewDto.productId,
      );
      if (!user || !product)
        throw new NotFoundException('상품이 없거나 유저가 없습니다');
      return this.productReviewRepository.createProductReview(
        createProductReviewDto,
      );
    } catch (error) {
      throw new InternalServerErrorException('서버 에러입니다.');
    }
  }

  async getAllProductReviewsByProductId(productId: number) {
    try {
      const productReviews =
        await this.productReviewRepository.getAllProductReviews(productId);
      if (productReviews.length < 0)
        throw new NotFoundException('리뷰가 없습니다.');
      return productReviews;
    } catch (error) {
      throw new InternalServerErrorException('서버 에러입니다.');
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} productReview`;
  }

  updateProductReview(
    id: number,
    updateProductReviewDto: UpdateProductReviewDto,
  ) {
    try {
      const productReview =
        this.productReviewRepository.getProductReviewById(id);
      if (!productReview)
        throw new NotFoundException('찾으시는 상품 리뷰가 없습니다.');
      this.productReviewRepository.updateProductReview(
        id,
        updateProductReviewDto,
      );
    } catch (error) {
      throw new InternalServerErrorException('서버 에러가 있습니다.');
    }
  }

  deleteProductReview(id: number) {
    try {
      const productReview =
        this.productReviewRepository.getProductReviewById(id);
      if (!productReview)
        throw new NotFoundException('삭제하실 리뷰가 없습니다');
      return this.productReviewRepository.deleteProductReview(id);
    } catch (error) {
      throw new InternalServerErrorException('서버에러 입니다.');
    }
  }
}
