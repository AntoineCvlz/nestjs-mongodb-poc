import { Injectable, NotFoundException } from '@nestjs/common';
import { PositionsUser } from './positions-user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePositionsUserDto } from './dto/create-positions-user.dto';
import { FilterPositionsUserDto } from './dto/filter-positions-user.dto';
import { ObjectId } from 'mongodb';
import { UpdatePositionsUserDto } from './dto/update-positions-user.dto';

@Injectable()
export class PositionsUserService {
  constructor(
    @InjectRepository(PositionsUser)
    private usersRepository: Repository<PositionsUser>,
  ) {}

  async create(createUserDto: CreatePositionsUserDto): Promise<PositionsUser> {
    const user = this.usersRepository.create(createUserDto);
    return this.usersRepository.save(user);
  }

  async findAll(filterDto: FilterPositionsUserDto): Promise<PositionsUser[]> {
    const { livreur_id } = filterDto;
    const filter: any = {};

    if (livreur_id) {
      filter.livreur_id = livreur_id;
    }

    return this.usersRepository.find({ where: filter });
  }

  async findOne(id: string): Promise<PositionsUser> {
    const position = await this.usersRepository.findOne({
      where: { _id: new ObjectId(id) },
    });

    if (!position) {
      throw new NotFoundException(`Position avec l'ID "${id}" non trouvée`);
    }

    return position;
  }

  async update(
    id: string,
    updateDto: UpdatePositionsUserDto,
  ): Promise<PositionsUser> {
    await this.usersRepository.update(id, updateDto);
    return this.usersRepository.findOne({ where: { _id: new ObjectId(id) } });
  }

  async delete(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
