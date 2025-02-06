import { IsString, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class FilterPositionsUserDto {
  @ApiPropertyOptional({
    description:
      "L'ID du livreur pour filtrer les positions. Ce paramètre est optionnel.",
  })
  @IsOptional()
  @IsString()
  livreur_id?: string;
}
