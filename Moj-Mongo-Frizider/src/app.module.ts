import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CuisineModule } from './cuisine/cuisine.module';
import { UserModule } from './user/user.module';
import { IngredientModule } from './ingredient/ingredient.module';
import { RecipeModule } from './recipe/recipe.module';

@Module({
  imports: [
    CuisineModule,
    UserModule, 
    IngredientModule, 
    RecipeModule, 
    MongooseModule.forRoot('mongodb://127.0.0.1:27017')
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
