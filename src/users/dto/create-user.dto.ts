import { IsString, IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'Le nom de l\'utilisateur',
    example: 'John Doe',
  })
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({
    description: 'L\'email de l\'utilisateur',
    example: 'johndoe@example.com',
  })
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;
}
