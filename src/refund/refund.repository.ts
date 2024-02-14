import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateRefundDto } from './dto/create-refund.dto';

@Injectable()
export class RefundRepository {
  constructor(private prisma: PrismaService) {}
  createRefund(createRefundDto: CreateRefundDto) {
    return this.prisma.refund.create({
      data: { ...createRefundDto },
    });
  }

  getAllRefunds() {
    return this.prisma.refund.findMany({});
  }

  getRefundsByUserId(userId: number) {
    return this.prisma.$queryRaw`
      SELECT 
        r."totalPrice", r."orderId", r."refundAt", r."refundReason",
        json_agg(json_build_object('productId', p.id, 'additionalCount', op."additionalCount", 'descImg', p."descImg"[1], 'name', p.name, 'count', op."orderCount" )) AS products
      FROM 
        "Refund" r
      JOIN 
        "Order" o ON r."orderId" = o.id
      JOIN
        "OrderProduct" op ON o.id = op."orderId"
      JOIN 
        "Product" p ON op."productId" = p.id
      WHERE 
        r."userId" = ${userId}
      GROUP BY 
        r."totalPrice", r."orderId", r."refundAt", r."refundReason"
    `;
  }
}
