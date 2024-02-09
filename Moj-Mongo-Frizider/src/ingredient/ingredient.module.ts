import { Module } from '@nestjs/common';
import { IngredientService } from './ingredient.service';
import { IngredientController } from './ingredient.controller';
import { IngredientSchema } from './entities/ingredient.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: 'Ingredient', schema: IngredientSchema }
    ])
  ],
  controllers: [IngredientController],
  providers: [IngredientService],
  exports: [IngredientService]
})
export class IngredientModule {}
