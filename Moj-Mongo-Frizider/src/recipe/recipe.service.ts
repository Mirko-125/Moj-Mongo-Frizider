import { Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { Model } from 'mongoose';
import { Recipe } from './entities/recipe.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Cuisine } from 'src/cuisine/entities/cuisine.entity';
import { CuisineService } from 'src/cuisine/cuisine.service';
import { ObjectId } from 'mongodb'; 
import { IngredientService } from 'src/ingredient/ingredient.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class RecipeService {
  constructor(
    @InjectModel('Recipe') private readonly model : Model<Recipe>,
    @InjectModel('Cuisine') private readonly cuisineModel: Model<Cuisine>,
    private readonly userService: UserService,
    private readonly ingredientService: IngredientService,
  ){}

  async create(userId: string, createRecipeDto: CreateRecipeDto) {
    const { ingredientIds, cuisineId, ...rest } = createRecipeDto;
    const promises = ingredientIds.map(async p => {
      return await this.ingredientService.findOne(p)
    })
    const ingredients = await Promise.all(promises);
    console.log(ingredients);
    const cuisine = new ObjectId(cuisineId);
    const chef = new ObjectId(userId);
    const recipe = new this.model({
      ...rest,
      ingredients,
      cuisine,
      chef
    });

    await recipe.save();
    await this.userService.addRecipeToChef(userId, recipe._id)
    return recipe;
  }

  async findAll() {
    return await this.model.find().exec();
  }

  async findRecipesWithCuisine(name: string) {
    return await this.cuisineModel.find({name}).populate('recipes').exec();
  }

  async findOne(id: string) {
    return await this.model.findById(id)
      .populate([
        {path: 'ingredients', model: 'Ingredient'},
        {path: "chef", select: '-_id'},
        "cuisine"
      ]).exec(); 
  }

  async update(chefId: string, id: string, updateRecipeDto: UpdateRecipeDto) {
    const recipe = await this.findOne(id);
    if (recipe) {
      if (recipe.chef.id != chefId) {
        throw new UnauthorizedException("This is not your recipe!");
      }
    }
    else {
      throw new NotFoundException("Recipe not found.")
    }
    return await new this.model({...recipe, ...updateRecipeDto}).save()
  }

  async remove(chefId: string, recipeId: string) {
    const recipe = await this.model.findByIdAndDelete(recipeId).exec();
    await this.userService.removeRecipeFromChef(chefId, recipeId);
    return recipe;
  }
}
