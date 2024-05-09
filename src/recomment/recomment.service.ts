import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRecommentDto } from './dto/create-recomment.dto';
import { UpdateRecommentDto } from './dto/update-recomment.dto';
import { RecommentRepository } from './recomment.repository';

@Injectable()
export class RecommentService {
  constructor(private recommentRepository: RecommentRepository) {}
  create(createRecommentDto: CreateRecommentDto, userId: number) {
    return this.recommentRepository.create(createRecommentDto, userId);
  }

  findAll() {
    return `This action returns all recomment`;
  }

  findOne(id: number) {
    return `This action returns a #${id} recomment`;
  }

  update(id: number, updateRecommentDto: UpdateRecommentDto) {
    return `This action updates a #${id} recomment`;
  }

  remove(id: number) {
    const recomment = this.recommentRepository.findOne(id);
    if (!recomment) throw new NotFoundException('존재하지 않는 댓글입니다.');
    return this.recommentRepository.remove(id);
  }
}
