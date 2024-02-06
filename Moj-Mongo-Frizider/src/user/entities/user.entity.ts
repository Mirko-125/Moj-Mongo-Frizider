import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseUser } from './base-user.entity';


@Schema({ collection: 'users', discriminatorKey: 'userType' })
export class User extends BaseUser {
    @Prop()
    liked: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);