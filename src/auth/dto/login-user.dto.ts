import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({ required: true, example: 'foodiful123@foodiful.com' })
  @IsString()
  @Matches(/^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/)
  email: string;

  @ApiProperty({ required: true, example: 'foodiful123' })
  @IsString()
  @Matches(/^[A-Za-z0-9]{6,12}$/, {
    message: '비밀번호는 알파벳과 숫자로만 구성되어야 합니다.',
  })
  password: string;
}
