import { Module } from '@nestjs/common';
import { PositionsUserController } from './positions-user.controller';
import { PositionsUserService } from './positions-user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PositionsUser } from './positions-user.entity';
import { User } from 'src/users/users.entity';
import { UsersService } from 'src/users/users.service';
import { IsValidLivreurId } from './validators/is-valid-livreur-id';

@Module({
  imports: [TypeOrmModule.forFeature([PositionsUser, User])],
  controllers: [PositionsUserController],
  providers: [PositionsUserService, UsersService, IsValidLivreurId]
})
export class PositionsUserModule {}
