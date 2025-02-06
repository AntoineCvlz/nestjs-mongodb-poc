import { IsOptional, IsNumber, IsString, IsEnum, IsArray, Validate, IsNotEmpty } from 'class-validator';
import { IsValidLivreurId } from '../validators/is-valid-livreur-id';

export class UpdatePositionsUserDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  // @Validate(IsValidLivreurId)
  livreur_id?: string;

  @IsNotEmpty()
  location: {
    type: 'Point';
    coordinates: [number, number];
  };

  @IsOptional()
  @IsNumber()
  speed_kmh?: number;

  @IsOptional()
  @IsEnum(['en cours de livraison', 'livraison terminée'])
  status?: string;
}
