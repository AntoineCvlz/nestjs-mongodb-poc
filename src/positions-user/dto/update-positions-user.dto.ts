import {
  IsOptional,
  IsNumber,
  IsString,
  IsEnum,
  IsObject,
  IsNotEmpty,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdatePositionsUserDto {
  @ApiProperty({
    description: "L'ID du livreur à mettre à jour (optionnel)",
    example: '123456',
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  livreur_id?: string;

  @ApiProperty({
    description:
      "La localisation mise à jour de l'utilisateur, avec un type de point et des coordonnées géographiques",
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

  @ApiPropertyOptional({
    description:
      'La vitesse de déplacement en km/h à mettre à jour, optionnelle',
    example: 50,
  })
  @IsOptional()
  @IsNumber()
  speed_kmh?: number;

  @ApiPropertyOptional({
    description:
      'Le statut de la livraison à mettre à jour, optionnel. Peut être "en cours de livraison" ou "livraison terminée"',
    example: 'en cours de livraison',
  })
  @IsOptional()
  @IsEnum(['en cours de livraison', 'livraison terminée'])
  status?: string;
}
