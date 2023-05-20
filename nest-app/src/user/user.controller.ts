import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
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
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { UserService } from './user.service';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(private userService: UserService) {
    this.userService = userService;
  }

  @Get(':id')
  @ApiOkResponse({ type: UserEntity })
  async getUserById(@Param('id') id: number): Promise<User> {
    return this.userService.getUserById(id);
  }

  @Get()
  @ApiOkResponse({ type: UserEntity, isArray: true })
  @ApiForbiddenResponse({ type: ForbiddenException, description: 'Forbidden' })
  async getUsers(): Promise<{ users: User[] }> {
    return this.userService.getUsers();
  }

  @Post()
  @ApiCreatedResponse({ type: UserEntity })
  @ApiConflictResponse({})
  @UseInterceptors(FileInterceptor('profile'))
  async postUser(
    @UploadedFile() file: Express.MulterS3.File,
    @Body()
    userData,
  ): Promise<{ createdUser: User; message: string }> {
    return this.userService.createUser(userData, file);
  }

  @Delete(':id')
  @ApiOkResponse({
    type: UserEntity,
  })
  async deleteUser(
    @Param('id') id: number,
  ): Promise<{ user: User; message: string }> {
    return this.userService.deleteUser(id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: UserEntity })
  @UseInterceptors(FileInterceptor('profile'))
  async patchUser(
    @UploadedFile() file: Express.MulterS3.File,
    @Param('id') id: number,
    @Body() updateUserData: UpdateUserDto,
  ): Promise<{ updatedUser: User; message: string }> {
    return this.userService.updateUser(id, updateUserData, file);
  }
}
