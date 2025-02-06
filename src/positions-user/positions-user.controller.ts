import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { PositionsUserService } from './positions-user.service';
import { CreatePositionsUserDto } from './dto/create-positions-user.dto';
import { PositionsUser } from './positions-user.entity';
import { FilterPositionsUserDto } from './dto/filter-positions-user.dto';
import { UpdatePositionsUserDto } from './dto/update-positions-user.dto';

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
  async findAll(
    @Query() filterDto: FilterPositionsUserDto,
  ): Promise<PositionsUser[]> {
    return this.positionsUserService.findAll(filterDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<PositionsUser> {
    return this.positionsUserService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDto: UpdatePositionsUserDto,
  ): Promise<PositionsUser> {
    return this.positionsUserService.update(id, updateDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    await this.positionsUserService.delete(id);
  }
}
