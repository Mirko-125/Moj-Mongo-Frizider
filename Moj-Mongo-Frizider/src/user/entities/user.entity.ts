import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseUser } from './base-user.entity';
import { Types } from 'mongoose';
import { Recipe } from 'src/recipe/entities/recipe.entity';


@Schema({ collection: 'users', discriminatorKey: 'userType' })
export class User extends BaseUser {
    @Prop([{type: Types.ObjectId, ref: 'Recipe', select: false}])
    liked: Recipe[];
}

export const UserSchema = SchemaFactory.createForClass(User);