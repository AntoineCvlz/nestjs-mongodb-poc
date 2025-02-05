import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { PositionsUserService } from './positions-user.service';
import { CreatePositionsUserDto } from './dto/create-positions-user.dto';
import { PositionsUser } from './positions-user.entity';

@Controller('positions-user')
export class PositionsUserController {
  constructor(private readonly positionsUserService: PositionsUserService) {}

  @Post()
  async create(
    @Body() createUserDto: CreatePositionsUserDto,
  ): Promise<PositionsUser> {
    return this.positionsUserService.create(createUserDto);
  }

  @Get()
  async findAll(): Promise<PositionsUser[]> {
    return this.positionsUserService.findAll();
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    await this.positionsUserService.delete(id);
  }
}
