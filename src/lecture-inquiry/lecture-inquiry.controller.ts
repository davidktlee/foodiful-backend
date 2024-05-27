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
import { LectureInquiry, Recomment, User } from '@prisma/client';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

@Controller('lecture-inquiry')
export class LectureInquiryController {
  constructor(private readonly lectureInquiryService: LectureInquiryService) {}

  @Post()
  @UseGuards(JwtGuard)
  create(
    @GetUser() user: User,
    @Body() createLectureInquiryDto: CreateLectureInquiryDto,
  ): Promise<LectureInquiry> {
    return this.lectureInquiryService.create(createLectureInquiryDto, user.id);
  }

  @Get('/recomment/:id')
  getRecommentByInquiryId(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Recomment[]> {
    return this.lectureInquiryService.getRecommentByInquiryId(id);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<LectureInquiry> {
    return this.lectureInquiryService.findOne(id);
  }

  // @Patch(':id')
  // update(
  //   @Param('id', ParseIntPipe) id: number,
  //   @Body() updateLectureInquiryDto: UpdateLectureInquiryDto,
  // ): Promise<LectureInquiry> {
  //   return this.lectureInquiryService.update(id, updateLectureInquiryDto);
  // }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<LectureInquiry> {
    return this.lectureInquiryService.remove(id);
  }
}
