import { Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { Model } from 'mongoose';
import { Recipe } from './entities/recipe.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Cuisine } from 'src/cuisine/entities/cuisine.entity';
import { CuisineService } from 'src/cuisine/cuisine.service';
import { UpdateRecipe } from './dto/create-recipe.dto';
import { ObjectId } from 'mongodb'; 
import { IngredientService } from 'src/ingredient/ingredient.service';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';

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

  async findAll(requestedIngredients: string[]) {
    
    const mappedIngredients = requestedIngredients.length ? 
      requestedIngredients.map(i => new ObjectId(i)) : []; 
    return await this.model.aggregate([
      {
          $addFields: {
              mappedIngredients: mappedIngredients,
              ingredientsCount: { $size: "$ingredients" }
          }
      },
      {
          $addFields: {
              ingredientsSubset: {
                  $setIsSubset: ["$ingredients", "$mappedIngredients"]
              }
          }
      },
      {
          $match: {
              ingredientsSubset: true
          }
      },
      {
        $sort: {
          ingredientsCount: -1
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: 'chef',
          foreignField: '_id',
          as: 'chef'
        }
      },
      {
        $lookup: {
          from: 'cuisines',
          localField: 'cuisine',
          foreignField: '_id',
          as: 'cuisine'
        }
      },
      {
          $project: {
              mappedIngredients: 0,
              ingredientsSubset: 0,
              ingredientsCount: 0,
              'chef.password': 0,
              'chef.recipes': 0 
          }
      }
    ]).exec();
  }

  async findRecipesWithCuisine(name: string) {
    return await this.cuisineModel.find({name}).populate('recipes').exec();
  }

  async getRecommendations(id: string){
    const recipe = await this.findOne(id);
    const recommendedRecipes = await this.model.aggregate([
      {
        $addFields: {
          mutualLikes: { $size: { $setIntersection: ["$likedBy", recipe.likedBy] } },
          mutualChefs: { $cond: { if: { $eq: ["$chef", recipe.chef] }, then: 1, else: 0 } },
          mutualCuisine: { $cond: { if: { $eq: ["$cuisine", recipe.cuisine] }, then: 1, else: 0 } }
        }
      },
      {
        $addFields: {
          recommendationScore: {
            $sum: [
              { $multiply: ["$mutualLikes", 1] },
              { $multiply: ["$mutualChefs", 20] },
              { $multiply: ["$mutualCuisine", 30] }
            ]
          }
        }
      },
      {
        $sort: { recommendationScore: -1 }
      },
      {
        $match: {
          _id: { $ne: recipe._id }
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: 'chef',
          foreignField: '_id',
          as: 'chef'
        }
      },
      {
        $lookup: {
          from: 'cuisines',
          localField: 'cuisine',
          foreignField: '_id',
          as: 'cuisine'
        }
      },
      {
        $limit : 10
      },
      {
        $project : {
          mutualLikes: 0,
          mutualChefs: 0,
          mutualCuisine: 0,
          recommendationScore: 0,
          'chef.password': 0,
          'chef.recipes': 0 
        }
      }
    ]).exec();

    return recommendedRecipes;
    
    // recommendedRecipes now contains the sorted list of recommended recipes
    
    
  }

  async getAll(){
    return await this.model.find().populate('chef cuisine').exec();
  }

  async likeRecipe(userId: string, recipeId: string) {
    const user = await this.userService.findById(userId) as User;
    const recipe = await this.findOne(recipeId);
    if (recipe) {
      if (!user.liked.includes(recipe._id))
        this.userService.addLiked(user._id, recipe._id);
    } else {
      throw new NotFoundException("Recipe doesn't exist");
    }
    if (!recipe.likedBy.includes(user._id))
      await this.model.findByIdAndUpdate(recipe._id, { $addToSet: { likedBy: new ObjectId(user._id) } }) 
    return "Success";
  }

  async findOne(id: string) {
    return await this.model.findById(id)
      .populate([
        { path: 'ingredients', model: 'Ingredient' },
        { path: "chef" },
        "cuisine"
      ]).exec(); 
  }

  async update(chefId: string, id: string, updateRecipeDto: UpdateRecipeDto) {
    const recipe = await this.findOne(id);
    const chefIdFromRecipe = recipe.chef._id.toString();
    console.log(chefIdFromRecipe);
    if (recipe) {
      if (chefIdFromRecipe !== chefId) {
        throw new UnauthorizedException("This is not your recipe!");
      }
    }
    else {
      throw new NotFoundException("Recipe not found.")
    }
    let { ingredientIds, cuisineId, ...rest } = updateRecipeDto;
    let updateRecipe: UpdateRecipe = { ...rest } as UpdateRecipe;
    if (ingredientIds) {
      const promises = ingredientIds.map(async p => {
        return await this.ingredientService.findOne(p)
      })
      const ingredients = await Promise.all(promises);
      updateRecipe.ingredients = ingredients.flatMap(i => i._id);
    }
    if (cuisineId) {
      updateRecipe.cuisine = new ObjectId(cuisineId);
    }
    return await this.model.findByIdAndUpdate(id, updateRecipe, {new: true});
  }

  async remove(chefId: string, recipeId: string) {
    const recipe = await this.model.findByIdAndDelete(recipeId).exec();
    await this.userService.removeRecipeFromChef(chefId, recipeId);
    return recipe;
  }
}
