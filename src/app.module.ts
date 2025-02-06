import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { PositionsUserModule } from './positions-user/positions-user.module';
import { RestaurantsModule } from './restaurants/restaurants.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: 'mongodb://admin:adminpassword@mongodb:27017/nest-js-mongodb-poq?authSource=admin',
      database: 'nest-js-mongodb-poq',
      useUnifiedTopology: true,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // ⚠️ Mettre à `false` en production
    }),
    UsersModule,
    PositionsUserModule,
    RestaurantsModule,
  ],
})
export class AppModule {}