import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(3)
  @MaxLength(10)
  readonly name: string;

  @IsString()
  @MinLength(6)
  @MaxLength(12)
  @Matches(/^[A-Za-z0-9]{6,12}$/, {
    message: '비밀번호는 알파벳과 숫자로만 구성되어야 합니다.',
  })
  readonly password: string;

  @IsString()
  @Matches(/^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/, {
    message: '이메일 형식에 맞지 않습니다.',
  })
  readonly email: string;

  @IsString()
  readonly phone: string;
}
