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

  async create(createUserDto: CreateRestaurantsDto): Promise<Restaurants> {
    const user = this.restaurantsRepository.create(createUserDto);
    return this.restaurantsRepository.save(user);
  }

  async findAll(): Promise<Restaurants[]> {
    return this.restaurantsRepository.find();
  }

  async findRestaurantByLocation(
    filterDto: FilterRestaurantsDto,
  ): Promise<Restaurants[]> {
    const { location } = filterDto;

    if (!location || location.length !== 2) {
      throw new Error(
        'Invalid location format. Expected [latitude, longitude]',
      );
    }

    const [latitude, longitude] = location;

    return this.restaurantsRepository
      .createQueryBuilder('restaurant')
      .where(
        `
                ST_DWithin(
                    ST_SetSRID(ST_MakePoint(restaurant.longitude, restaurant.latitude), 4326),
                    ST_SetSRID(ST_MakePoint(:longitude, :latitude), 4326),
                    5000  -- Rayon de recherche en mètres (ici 5km)
                )
            `,
        { latitude, longitude },
      )
      .getMany();
  }

  async delete(id: string): Promise<void> {
    await this.restaurantsRepository.delete(id);
  }
}
