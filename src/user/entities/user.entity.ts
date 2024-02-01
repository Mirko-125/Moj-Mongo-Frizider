import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseUser } from './base-user.entity';


@Schema({ collection: 'users', discriminatorKey: 'cardType' })
export class User extends BaseUser {
    @Prop()
    recipes: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);