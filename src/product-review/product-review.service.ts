import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductReviewDto } from './dto/create-product-review.dto';
import { UpdateProductReviewDto } from './dto/update-product-review.dto';
import { ProductReviewRepository } from './product-review.repository';

@Injectable()
export class ProductReviewService {
  constructor(private productReviewRepository: ProductReviewRepository) {}
  create(createProductReviewDto: CreateProductReviewDto) {
    return 'This action adds a new productReview';
  }

  async getAllProductReviews(id: number) {
    try {
      const productReviews =
        await this.productReviewRepository.getAllProductReviews(id);
      if (productReviews.length > 0)
        throw new NotFoundException('리뷰가 없습니다.');
      return productReviews;
    } catch (error) {
      throw new InternalServerErrorException('서버 에러입니다.');
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} productReview`;
  }

  update(id: number, updateProductReviewDto: UpdateProductReviewDto) {
    return `This action updates a #${id} productReview`;
  }

  remove(id: number) {
    return `This action removes a #${id} productReview`;
  }
}
