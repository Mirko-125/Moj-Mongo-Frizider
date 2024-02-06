import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';


@Schema({ collection: 'users', discriminatorKey: 'userType' })
export class BaseUser extends Document {
    @Prop()
    name: string;

    @Prop({select: false})
    password: string;

    @Prop({unique: true})
    email: string;

    userType?: string;
}

export const BaseUserSchema = SchemaFactory.createForClass(BaseUser);
