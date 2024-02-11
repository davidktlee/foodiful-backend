import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateRefundDto } from './dto/create-refund.dto';

@Injectable()
export class RefundRepository {
  constructor(private prisma: PrismaService) {}
  createRefund(createRefundDto: CreateRefundDto) {
    console.log(createRefundDto);
    // return this.prisma.refund.create({
    //   data: { ...createRefundDto },
    // });
  }
}
