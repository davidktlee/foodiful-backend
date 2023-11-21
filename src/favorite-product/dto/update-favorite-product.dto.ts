import { PartialType } from '@nestjs/swagger';
import { CreateFavoriteProductDto } from './create-favorite-product.dto';

export class UpdateFavoriteProductDto extends PartialType(CreateFavoriteProductDto) {}
