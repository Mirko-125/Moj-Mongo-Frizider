import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseUser } from './base-user.entity';


@Schema({ collection: 'users', discriminatorKey: 'userType' })
export class Chef extends BaseUser {
    @Prop()
    recipes: string[];
}

export const ChefSchema = SchemaFactory.createForClass(Chef);