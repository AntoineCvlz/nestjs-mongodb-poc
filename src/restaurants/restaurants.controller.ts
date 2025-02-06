import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { CreateRestaurantsDto } from './dto/create-restaurants-dto';
import { Restaurants } from './restaurants.entity';
import { FilterRestaurantsDto } from './dto/filter-restaurants-dto';

@Controller('restaurants')
export class RestaurantsController {
  constructor(private readonly restaurantsService: RestaurantsService) {}

  @Post()
  async create(
    @Body() createRestaurantsDto: CreateRestaurantsDto,
  ): Promise<Restaurants> {
    return this.restaurantsService.create(createRestaurantsDto);
  }

  @Get()
  async findAll(): Promise<Restaurants[]> {
    return this.restaurantsService.findAll();
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    await this.restaurantsService.delete(id);
  }

  @Get('nearby')
  async findNearby(
    @Query() filterRestaurantsDto: FilterRestaurantsDto,
  ): Promise<Restaurants[]> {
    return this.restaurantsService.findNearbyRestaurants(filterRestaurantsDto);
  }
}
