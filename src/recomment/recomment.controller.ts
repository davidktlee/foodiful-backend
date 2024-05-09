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
import { RecommentService } from './recomment.service';
import { CreateRecommentDto } from './dto/create-recomment.dto';
import { UpdateRecommentDto } from './dto/update-recomment.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from '@prisma/client';

@Controller('recomment')
@UseGuards(JwtGuard)
export class RecommentController {
  constructor(private readonly recommentService: RecommentService) {}

  @Post()
  create(
    @GetUser() user: User,
    @Body() createRecommentDto: CreateRecommentDto,
  ) {
    return this.recommentService.create(createRecommentDto, user.id);
  }

  @Get()
  findAll() {
    return this.recommentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recommentService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRecommentDto: UpdateRecommentDto,
  ) {
    return this.recommentService.update(+id, updateRecommentDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.recommentService.remove(id);
  }
}
