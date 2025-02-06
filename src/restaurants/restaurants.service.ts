import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Restaurants } from './restaurants.entity';
import { CreateRestaurantsDto } from './dto/create-restaurants-dto';
import { FilterRestaurantsDto } from './dto/filter-restaurants-dto';

@Injectable()
export class RestaurantsService {
  constructor(
    @InjectRepository(Restaurants)
    private restaurantsRepository: Repository<Restaurants>,
  ) {}

  async create(
    createRestaurantsDto: CreateRestaurantsDto,
  ): Promise<Restaurants> {
    const restaurant = this.restaurantsRepository.create(createRestaurantsDto);
    return this.restaurantsRepository.save(restaurant);
  }

  async findAll(): Promise<Restaurants[]> {
    return this.restaurantsRepository.find();
  }

  async delete(id: string): Promise<void> {
    await this.restaurantsRepository.delete(id);
  }

  async findNearbyRestaurants(
    filterRestaurantsDto: FilterRestaurantsDto,
  ): Promise<Restaurants[]> {
    const { location, radius } = filterRestaurantsDto;
    const distanceInMeters = radius * 1000; // Convertir x km en mètres

    // Accéder au MongoRepository directement
    const mongoRepository =
      this.restaurantsRepository.manager.connection.getMongoRepository(
        Restaurants,
      );
      

    const restaurants = await mongoRepository
      .aggregate([
        {
          $geoNear: {
            near: { type: 'Point', coordinates: location }, // [longitude, latitude]
            distanceField: 'distance',
            spherical: true,
            maxDistance: distanceInMeters, // Recherche dans un rayon de x mètres
          },
        },
        {
          $project: {
            name: 1,
            location: 1,
            distance: { $round: ['$distance', 0] }, // Afficher la distance pour chaque restaurant
          },
        },
      ])
      .toArray();

    return restaurants;
  }
}
