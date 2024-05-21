import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

import { User } from '@prisma/client';
import { UserRepository } from './user.repository';
import { UpdateUserDto } from '../auth/dto/update-user.dto';
import { ConfigService } from '@nestjs/config';
import { OrderRepository } from 'src/order/order.repository';
import { ProductReviewService } from 'src/product-review/product-review.service';
import { RefundRepository } from 'src/refund/refund.repository';
import { LectureRepository } from 'src/lecture/lecture.repository';

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
    private readonly orderRepository: OrderRepository,
    private readonly config: ConfigService,
    private productReviewService: ProductReviewService,
    private refundRepository: RefundRepository,
    private lectureRepository: LectureRepository,
  ) {}

  /**
   *
   * @Todo: auth 기능 만든 후 getUsers, getUserById 기능은 관리자 일때만 가능하도록 만들기
   */
  async getUsers(): Promise<User[]> {
    const users = await this.userRepository.getUser();
    if (users.length === 0) throw new ForbiddenException('회원이 없습니다');
    return users;
  }

  async getUserById(id: number): Promise<User> {
    const user = await this.userRepository.getUserById(id);
    if (!user) throw new NotFoundException('찾으시는 회원이 없습니다');
    return user;
  }

  async getUserByUserEmail(email: string): Promise<User> {
    const user = await this.userRepository.getUserByUserEmail(email);
    if (!user) throw new NotFoundException('찾으시는 회원이 없습니다');
    return user;
  }

  async deleteUser(id: number): Promise<{ user: User; message: string }> {
    const user = await this.userRepository.getUserById(id);
    if (!user) throw new NotFoundException('삭제하실 회원이 없습니다');
    else {
      await this.userRepository.deleteUser(id);
      return { user, message: '회원 삭제가 완료되었습니다.' };
    }
  }

  // async uploadUserProfile(file: Express.MulterS3.File) {
  //   if (!file) {
  //     throw new BadRequestException('파일을 업로드해주세요.');
  //   }
  //   return file.location;
  // }

  // async deleteUserProfile(key: string) {
  //   const s3 = new S3({
  //     region: this.config.get('AWS_BUCKET_REGION'),
  //     credentials: {
  //       accessKeyId: this.config.get('AWS_ACCESS_KEY_ID'),
  //       secretAccessKey: this.config.get('AWS_SECRET_ACCESS_KEY'),
  //     },
  //   });
  //   const startKey = key.indexOf('user');
  //   await s3.deleteObject({
  //     Bucket: this.config.get('AWS_BUCKET_NAME'),
  //     Key: key.slice(startKey, key.length),
  //   });
  // }

  async updateUser(
    id: number,
    updateUserData: UpdateUserDto,
  ): Promise<{ updatedUser; message: string }> {
    const user = await this.userRepository.getUserById(id);
    if (!user) throw new NotFoundException('수정하실 회원이 존재하지 않습니다');
    else {
      // user와 updateUserData 비교 로직
      for (const key in user) {
        if (
          !!user[key] &&
          !!updateUserData[key] &&
          user[key] !== updateUserData[key]
        ) {
          user[key] = updateUserData[key];
        }
      }

      const updatedUser = await this.userRepository.updateUser(id, {
        ...user,
      });
      return { updatedUser, message: '수정이 완료되었습니다.' };
    }
  }

  async getUserProductReviews(userId: number) {
    const review = await this.productReviewService.getUserProductReviews(
      userId,
    );
    if (!review.length) return [];
    else return review;
  }

  async getReservationByUserId(userId: number) {
    const user = await this.userRepository.getReservationByUserId(userId);
    const reservationWithLecture = await Promise.allSettled(
      user.reservations.map(async (reserve) => {
        const lecture = await this.lectureRepository.getLectureById(
          reserve.lectureId,
        );
        return {
          ...reserve,
          reserveDate: reserve.reserveDate[0],
          lectureName: lecture.name,
          lecturePrice: lecture.price,
          lectureDuration: lecture.lectureDuration,
          lectureRegular: lecture.regular,
        };
      }),
    ).then((item) => item.map((v) => v.status === 'fulfilled' && v.value));
    if (user) return reservationWithLecture;
  }

  async getRefundsByUserId(userId: number) {
    const refunds = await this.refundRepository.getRefundsByUserId(userId);
    return refunds;
  }
}
