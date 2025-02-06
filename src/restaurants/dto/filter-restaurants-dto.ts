import { IsNotEmpty, IsArray, IsNumber, ArrayMinSize } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class FilterRestaurantsDto {
  @ApiProperty({
    type: [Number], // Swagger comprend un tableau de nombres
    description: 'Les coordonnées géographiques sous forme de [latitude, longitude]',
    example: [48.8566, 2.3522],
  })
  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(2)
  @IsNumber({}, { each: true })
  @Transform(({ value }) => {
    if (Array.isArray(value)) {
      return value.map(Number); // Convertir chaque élément en nombre
    }
    return JSON.parse(value); // Si c'est une string JSON, la parser
  })
  location: [number, number];

  @ApiProperty({
    description: 'La distance maximale en km autour des coordonnées',
    example: 50,
  })
  @IsNotEmpty()
  @IsNumber()
  @Transform(({ value }) => Number(value))
  radius: number;
}
