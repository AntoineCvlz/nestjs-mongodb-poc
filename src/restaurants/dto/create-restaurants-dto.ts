import { IsString, IsNotEmpty, IsObject } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRestaurantsDto {
  @ApiProperty({
    description: 'Le nom du restaurant',
    example: 'Le Gourmet',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'La localisation du restaurant avec un type de point et des coordonnées géographiques',
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
}
