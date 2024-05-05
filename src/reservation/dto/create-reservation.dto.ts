import { IsNumber, IsString } from 'class-validator';

export class CreateReservationDto {
  @IsString()
  readonly reserveDate: string;

  @IsNumber()
  readonly lectureId: number;
}
