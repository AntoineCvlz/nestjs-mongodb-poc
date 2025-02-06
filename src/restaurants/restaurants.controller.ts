import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { CreateRestaurantsDto } from './dto/create-restaurants-dto';
import { Restaurants } from './restaurants.entity';

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
}
