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
