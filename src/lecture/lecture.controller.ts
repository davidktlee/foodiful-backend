import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { LectureService } from './lecture.service';
import { CreateLectureDto } from './dto/create-lecture.dto';
import { UpdateLectureDto } from './dto/update-lecture.dto';
import { GetUserToken } from 'src/auth/get-user-token.decorator';
import { Lecture, LectureInquiry } from '@prisma/client';

@Controller('lecture')
export class LectureController {
  constructor(private readonly lectureService: LectureService) {}

  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  @Post()
  create(@Body() createLectureDto: CreateLectureDto): Promise<Lecture> {
    return this.lectureService.addLecture(createLectureDto);
  }

  @Get('/all')
  getAllLectures(@GetUserToken() token: string): Promise<Lecture[]> {
    return this.lectureService.getAllLectures(token);
  }

  @Get('/inquiry/:id')
  getAllInquiryByLectureId(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<LectureInquiry[]> {
    return this.lectureService.getLectureInquiry(id);
  }

  @Get(':id')
  getLectureById(@Param('id', ParseIntPipe) id: number): Promise<Lecture> {
    return this.lectureService.getLectureById(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateLectureDto: UpdateLectureDto,
  ): Promise<Lecture> {
    return this.lectureService.update(id, updateLectureDto);
  }

  // @Delete(':id')
  // remove(@Param('id', ParseIntPipe) id: number) {
  //   return this.lectureService.remove(id);
  // }
}
