import { Injectable } from '@nestjs/common';
import { CreateRefundDto } from './dto/create-refund.dto';
import { UpdateRefundDto } from './dto/update-refund.dto';
import { RefundRepository } from './refund.repository';

@Injectable()
export class RefundService {
  constructor(private refundRepository: RefundRepository) {}
  create(createRefundDto: CreateRefundDto) {
    return this.refundRepository.createRefund(createRefundDto);
  }

  findAll() {
    return `This action returns all refund`;
  }

  findOne(id: number) {
    return `This action returns a #${id} refund`;
  }

  update(id: number, updateRefundDto: UpdateRefundDto) {
    return `This action updates a #${id} refund`;
  }

  remove(id: number) {
    return `This action removes a #${id} refund`;
  }
}
