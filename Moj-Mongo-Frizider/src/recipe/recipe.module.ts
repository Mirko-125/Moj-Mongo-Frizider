import { Module } from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { RecipeController } from './recipe.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { RecipeSchema } from './entities/recipe.entity';
import { CuisineModule } from 'src/cuisine/cuisine.module';
import { CuisineSchema } from 'src/cuisine/entities/cuisine.entity';
import { IngredientModule } from 'src/ingredient/ingredient.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: 'Recipe', schema: RecipeSchema},
      {name: 'Cuisine', schema: CuisineSchema},
    ]),
    CuisineModule,
    IngredientModule,
    UserModule
  ],
  controllers: [RecipeController],
  providers: [RecipeService],
})
export class RecipeModule {}
