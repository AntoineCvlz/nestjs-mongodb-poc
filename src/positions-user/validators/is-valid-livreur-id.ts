import { Injectable } from '@nestjs/common';
import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
import { UsersService } from 'src/users/users.service';

@ValidatorConstraint({ async: true })
@Injectable()
export class IsValidLivreurId implements ValidatorConstraintInterface {
  constructor(private readonly usersService: UsersService) {}

  async validate(livreur_id: string): Promise<boolean> {
    if (!livreur_id) return false;

    const livreur = await this.usersService.findOne(livreur_id);
    return !!livreur;
  }

  defaultMessage(args: ValidationArguments): string {
    return `Le livreur avec l'ID "${args.value}" n'existe pas.`;
  }
}