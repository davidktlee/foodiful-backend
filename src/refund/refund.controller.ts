import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { RefundService } from './refund.service';
import { CreateRefundDto } from './dto/create-refund.dto';
import { UpdateRefundDto } from './dto/update-refund.dto';

@Controller('refund')
export class RefundController {
  constructor(private readonly refundService: RefundService) {}

  @Post()
  create(@Body() createRefundDto: CreateRefundDto) {
    return this.refundService.create(createRefundDto);
  }

  @Get()
  findAll() {
    return this.refundService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.refundService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateRefundDto: UpdateRefundDto,
  ) {
    return this.refundService.update(id, updateRefundDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.refundService.remove(id);
  }
}
