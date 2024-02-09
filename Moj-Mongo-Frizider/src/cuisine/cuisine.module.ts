import { Module } from '@nestjs/common';
import { CuisineService } from './cuisine.service';
import { CuisineController } from './cuisine.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CuisineSchema } from './entities/cuisine.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: 'Cuisine', schema: CuisineSchema}
    ])
  ],
  controllers: [CuisineController],
  providers: [CuisineService],
  exports: [CuisineService]
})
export class CuisineModule {}
