import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ required: true, example: '푸디풀' })
  @IsString()
  @MinLength(3)
  @MaxLength(10)
  readonly name: string;

  @ApiProperty({ required: true, example: 'foodiful123' })
  @IsString()
  @MinLength(6)
  @MaxLength(12)
  @Matches(/^[A-Za-z0-9]{6,12}$/, {
    message: '비밀번호는 알파벳과 숫자로만 구성되어야 합니다.',
  })
  readonly password: string;

  @ApiProperty({ required: true, example: 'foodiful123@foodiful.com' })
  @IsString()
  @Matches(/^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/, {
    message: '이메일 형식에 맞지 않습니다.',
  })
  readonly email: string;

  /**
   * @Todo: 휴대폰 번호 하이픈 없는 형식 정규식 적용하기
   */
  @ApiProperty({ required: true, example: '01012341234' })
  @IsString()
  @Matches(/^[0-9]{3}[0-9]{4}[0-9]{4}/, {
    message: '휴대폰 번호 형식에 맞지 않습니다.',
  })
  readonly phone: string;
}
