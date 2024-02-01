import { Module } from '@nestjs/common';
import { CuisineService } from './cuisine.service';
import { CuisineController } from './cuisine.controller';

@Module({
  controllers: [CuisineController],
  providers: [CuisineService],
})
export class CuisineModule {}
