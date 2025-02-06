import { IsNotEmpty, IsArray, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class FilterRestaurantsDto {
  @ApiProperty({
    description: 'Les coordonnées géographiques pour filtrer les restaurants, sous forme de tableau [latitude, longitude]',
    example: [50.628330, 3.071170],
    type: [Number],
  })
  @IsNotEmpty()
  @IsArray()
  @Transform(({ value }) => Array.isArray(value) ? value.map(Number) : value)
  location: [number, number];

  @ApiProperty({
    description: 'La distance maximale en km autour des coordonnées',
    example: 50,
    type: Number,
  })
  @IsNotEmpty()
  @IsNumber()
  @Transform(({ value }) => Number(value))
  radius: number;
}
