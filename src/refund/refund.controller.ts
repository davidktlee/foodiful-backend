import { Controller, Get, Post, Body } from '@nestjs/common';
import { RefundService } from './refund.service';
import { CreateRefundDto } from './dto/create-refund.dto';
import { Refund } from '@prisma/client';

@Controller('refund')
export class RefundController {
  constructor(private readonly refundService: RefundService) {}

  @Post()
  create(@Body() createRefundDto: CreateRefundDto): Promise<Refund> {
    return this.refundService.create(createRefundDto);
  }

  @Get()
  getAllRefunds(): Promise<Refund[]> {
    return this.refundService.getAllRefunds();
  }

  // @Patch(':id')
  // update(
  //   @Param('id', ParseIntPipe) id: number,
  //   @Body() updateRefundDto: UpdateRefundDto,
  // ) {
  //   return this.refundService.update(id, updateRefundDto);
  // }

  // @Delete(':id')
  // remove(@Param('id', ParseIntPipe) id: number) {
  //   return this.refundService.remove(id);
  // }
}
