export class CreateUserDto {
    readonly name: string;
    readonly email: string;
    readonly location: number[]; // [latitude, longitude]
  }
  