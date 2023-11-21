import { PartialType } from '@nestjs/swagger';
import { CreateFavoriteClassDto } from './create-favorite-class.dto';

export class UpdateFavoriteClassDto extends PartialType(CreateFavoriteClassDto) {}
