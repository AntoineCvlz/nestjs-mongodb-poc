import { Module } from '@nestjs/common';
import { PositionsUserController } from './positions-user.controller';
import { PositionsUserService } from './positions-user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PositionsUser } from './positions-user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PositionsUser])],
  controllers: [PositionsUserController],
  providers: [PositionsUserService]
})
export class PositionsUserModule {}
