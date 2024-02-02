import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseUser } from './base-user.entity';


@Schema({ collection: 'users', discriminatorKey: 'cardType' })
export class Chef extends BaseUser {
    @Prop()
    liked: string[];
}

export const ChefSchema = SchemaFactory.createForClass(Chef);