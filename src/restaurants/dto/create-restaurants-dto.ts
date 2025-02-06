export class CreateRestaurantsDto {
    name: string;
    location: {
      type: 'Point';
      coordinates: [number, number];
    };
  }
  