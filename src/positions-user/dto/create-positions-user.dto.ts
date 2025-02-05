export class CreatePositionsUserDto {
  livreur_id: string;
  location: {
    type: 'Point';
    coordinates: [number, number];
  };
}
