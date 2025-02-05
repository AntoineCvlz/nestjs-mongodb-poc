import { Injectable } from '@nestjs/common';
import { PositionsUser } from './positions-user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePositionsUserDto } from './dto/create-positions-user.dto';

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

  async findAll(): Promise<PositionsUser[]> {
    return this.usersRepository.find();
  }

  async delete(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }  
}
