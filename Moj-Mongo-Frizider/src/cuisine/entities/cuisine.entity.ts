import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from 'mongoose';
import { Recipe } from "src/recipe/entities/recipe.entity";

@Schema()
export class Cuisine extends Document {
    @Prop()
    name: string;

    @Prop()
    description: string;

    @Prop([{type: Types.ObjectId, ref:'Recipe', select: false}])
    recipes: Recipe[];
}

export const CuisineSchema = SchemaFactory.createForClass(Cuisine);