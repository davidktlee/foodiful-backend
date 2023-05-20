import { IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly password: string;

  @IsString()
  readonly userId: string;

  @IsString()
  readonly phone: string;

  @IsString()
  readonly profile: string;
}
