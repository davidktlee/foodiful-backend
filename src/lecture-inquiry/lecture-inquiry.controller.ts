import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { LectureInquiryService } from './lecture-inquiry.service';
import { CreateLectureInquiryDto } from './dto/create-lecture-inquiry.dto';
import { UpdateLectureInquiryDto } from './dto/update-lecture-inquiry.dto';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from '@prisma/client';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

@Controller('lecture-inquiry')
export class LectureInquiryController {
  constructor(private readonly lectureInquiryService: LectureInquiryService) {}

  @Post()
  @UseGuards(JwtGuard)
  create(
    @GetUser() user: User,
    @Body() createLectureInquiryDto: CreateLectureInquiryDto,
  ) {
    return this.lectureInquiryService.create(createLectureInquiryDto, user.id);
  }

  @Get()
  findAll() {
    return this.lectureInquiryService.findAll();
  }

  @Get('/recomment/:id')
  getRecommentByInquiryId(@Param('id', ParseIntPipe) id: number) {
    return this.lectureInquiryService.getRecommentByInquiryId(id);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.lectureInquiryService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateLectureInquiryDto: UpdateLectureInquiryDto,
  ) {
    return this.lectureInquiryService.update(+id, updateLectureInquiryDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.lectureInquiryService.remove(id);
  }
}
