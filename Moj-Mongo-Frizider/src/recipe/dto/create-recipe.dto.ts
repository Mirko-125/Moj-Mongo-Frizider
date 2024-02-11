import { ObjectId, Types } from "mongoose";
import { Ingredient } from "src/ingredient/entities/ingredient.entity";

export class CreateRecipeDto {
    name: string;
    imageURL: string;
    description: string;
    category: string[];
    cookingType: string;
    budget: string;
    ingredientIds: string[];
    cuisineId: string;
}

export class UpdateRecipe {
    name?: string;
    imageURL?: string;
    description?: string;
    category?: string[];
    cookingType?: string;
    budget?: string;
    ingredients?: Types.ObjectId[];
    cuisine?: Types.ObjectId;
}
