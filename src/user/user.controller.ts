import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/get-user.decorator';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { UpdateUserDto } from '../auth/dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { UserService } from './user.service';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @ApiOkResponse({ type: UserEntity, isArray: true })
  @ApiForbiddenResponse({ type: ForbiddenException, description: 'Forbidden' })
  async getUsers() {
    const users = await this.userService.getUsers();
    return users.map((user) => {
      const { password, ...rest } = user;
      return rest;
    });
  }

  @Get('/product-review')
  @UseGuards(JwtGuard)
  getUserProductReviews(@GetUser() user: User) {
    this.userService.getUserProductReviews(user.id);
  }

  @Get(':id')
  @ApiOkResponse({ type: UserEntity })
  async getUserById(@Param('id', ParseIntPipe) id: User['id']) {
    const user = await this.userService.getUserById(id);
    const { password, ...rest } = user;
    return rest;
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  @ApiOkResponse({
    type: UserEntity,
  })
  deleteUser(
    @Param('id', ParseIntPipe) id: User['id'],
  ): Promise<{ user: User; message: string }> {
    return this.userService.deleteUser(id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: UserEntity })
  @UseInterceptors(FileInterceptor('profile'))
  patchUser(
    @Param('id') id: number,
    @Body() updateUserData: UpdateUserDto,
  ): Promise<{ updatedUser: User; message: string }> {
    return this.userService.updateUser(id, updateUserData);
  }
}
