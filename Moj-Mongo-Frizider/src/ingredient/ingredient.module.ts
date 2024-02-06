import { Module } from '@nestjs/common';
import { IngredientService } from './ingredient.service';
import { IngredientController } from './ingredient.controller';
import { IngredientSchema } from './entities/ingredient.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: 'Ingredients', schema: IngredientSchema }
    ])
  ],
  controllers: [IngredientController],
  providers: [IngredientService],
})
export class IngredientModule {}
