import { IsPhoneNumber, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(3)
  @MaxLength(10)
  readonly name: string;

  @IsString()
  @MinLength(6)
  @MaxLength(12)
  readonly password: string;

  @IsString()
  @MinLength(3)
  @MaxLength(10)
  readonly userId: string;

  @IsString()
  readonly phone: string;
}
