import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsObject,
  Validate,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsValidLivreurId } from '../validators/is-valid-livreur-id';

export class CreatePositionsUserDto {
  @ApiProperty({
    description: "L'ID du livreur",
  })
  @IsString()
  @IsNotEmpty()
  // @Validate(IsValidLivreurId)
  livreur_id: string;

  @ApiProperty({
    description:
      "La localisation du livreur, avec un type de point et des coordonnées géographiques",
    example: {
      type: 'Point',
      coordinates: [48.8566, 2.3522],
    },
  })
  @IsNotEmpty()
  @IsObject()
  location: {
    type: 'Point';
    coordinates: [number, number];
  };

  @ApiProperty({
    description: 'La vitesse de déplacement en km/h, optionnelle',
    example: 50,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  speed_kmh?: number;

  @ApiProperty({
    description:
      'Le statut de la livraison, peut être "en cours de livraison" ou "livraison terminée", optionnel',
    example: 'en cours de livraison',
    required: false,
  })
  @IsOptional()
  @IsEnum(['en cours de livraison', 'livraison terminée'])
  status?: string;
}
