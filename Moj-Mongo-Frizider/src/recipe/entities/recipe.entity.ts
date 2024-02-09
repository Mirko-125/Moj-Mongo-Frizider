import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from 'mongoose';
import { Cuisine } from "src/cuisine/entities/cuisine.entity";
import { Ingredient } from "src/ingredient/entities/ingredient.entity";
import { BaseUser } from "src/user/entities/base-user.entity";
import { Chef } from "src/user/entities/chef.entity";

@Schema()
export class Recipe extends Document{
    @Prop()
    name: string;

    @Prop()
    imageURL: string;

    @Prop()
    description: string;

    @Prop()
    category: string[];

    @Prop()
    cookingType: string;

    @Prop()
    budget: string;

    @Prop([{ type: Types.ObjectId, ref: 'Ingredient'}])
    ingredients: Ingredient[];

    @Prop({type: Types.ObjectId, ref: 'Cuisine'})
    cuisine: Cuisine;

    @Prop({type: Types.ObjectId, ref: 'Chef'})
    chef: Chef;

    @Prop([{type: Types.ObjectId, ref: 'BaseUser', select: false}])
    likedBy: BaseUser[];

    @Prop([{type: Types.ObjectId, ref: 'Comment', select: false}])
    comments: Comment[];
}

export const RecipeSchema = SchemaFactory.createForClass(Recipe);

